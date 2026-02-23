import { NotificationReaction } from "@/components/NotificationReaction";
import {
  conectarWebSocket,
  desconectarWebSocket,
  isConnecteds,
} from "@/services/websocket/websocket";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Vibration,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyState } from "../../components/EmptyState";
import { Header } from "../../components/Header";
import { Notification } from "../../components/Notification";
import { SuccessAlert } from "../../components/SuccessAlert";
import { VerseCard } from "../../components/VerseCard";
import { VerseForm } from "../../components/VerseForm";
import {
  buscarDevocional,
  criarDevocional,
} from "../../services/api/devocionalService";
import { reagir } from "../../services/api/reactionService";
import { useAuthStore } from "../../stores/authStore";
import type { Devocional, TipoReacao } from "../../types";
import { colors } from "../../utils/colors";

export default function HomeScreen() {
  const router = useRouter();
  const { sessao, logout } = useAuthStore();
  const insets = useSafeAreaInsets();

  const [currentVerse, setCurrentVerse] = useState<Devocional | null>(null);
  const [newVerse, setNewVerse] = useState("");
  const [reference, setReference] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationReaction, setShowNotificationReaction] =
    useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const bottomPadding = Math.min(keyboardHeight, 220);

  // 1. Listener do teclado
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const userName = sessao?.usuario || "";
  const codigoCasal = sessao?.codigoCasal || "";

  // 2. Buscar devocional inicial
  useEffect(() => {
    if (!codigoCasal || !userName) {
      console.log("⚠️ Sessão incompleta:", { codigoCasal, userName });
      return;
    }

    console.log("🔍 Buscando devocional inicial...");
    buscarDevocional(codigoCasal, userName)
      .then((data) => {
        console.log("✅ Devocional encontrado:", {
          autor: data.autor,
          referencia: data.referencia,
        });
        setCurrentVerse(data);
        setIsConnected(true);
      })
      .catch((error) => {
        console.log("ℹ️ Nenhum devocional encontrado ainda");
        setCurrentVerse(null);
        setIsConnected(true);
      });
  }, [codigoCasal, userName]);

  // 3. Conectar WebSocket
  useEffect(() => {
    if (!codigoCasal || !userName) {
      console.log("⚠️ Não conectando WebSocket - sessão incompleta");
      return;
    }

    console.log("🔌 Conectando WebSocket para:", { codigoCasal, userName });

    conectarWebSocket(codigoCasal, (payload) => {
      console.log("📨 WebSocket: Payload recebido!", {
        remetente: payload.remetente,
        autor: payload.devocional.autor,
        meuUsuario: userName,
      });

      const { devocional, remetente, tipo } = payload;

      // Atualizar estado do devocional atual
      setCurrentVerse((prev) => {
        if (!prev) return devocional;

        // 🔥 Se for reação, só atualiza reações
        if (tipo === "REACAO") {
          return {
            ...prev,
            contagemReacoes: devocional.contagemReacoes ?? prev.contagemReacoes,
            minhaReacao: devocional.minhaReacao ?? prev.minhaReacao,
          };
        }

        // 📖 Se for devocional novo, substitui tudo
        return devocional;
      });

      // notificar apenas quando for REACAO
      if (tipo === "REACAO" && remetente !== userName) {
        console.log("🔔 Mostrando notificação de reação!");
        setShowNotificationReaction(true);

        // Vibrar
        if (Platform.OS !== "web") {
          Vibration.vibrate(200);
        }

        // Esconder notificação após 5s
        setTimeout(() => {
          setShowNotificationReaction(false);
        }, 5000);

        return;
      }

      // Se eu mesmo enviei, não mostrar notificação
      if (remetente === userName) {
        console.log("ℹ️ Eu mesmo enviei, não notificar");
        return;
      }

      // Mostrar notificação para mensagens de outros
      console.log("🔔 Mostrando notificação!");
      setShowNotification(true);

      // Vibrar
      if (Platform.OS !== "web") {
        Vibration.vibrate(200);
      }

      // Esconder notificação após 5s
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    });

    // Verificar status da conexão após 2s
    setTimeout(() => {
      console.log(
        "🔍 Status WebSocket:",
        isConnecteds() ? "CONECTADO ✅" : "DESCONECTADO ❌",
      );
    }, 2000);

    return () => {
      console.log("🔌 Desconectando WebSocket...");
      desconectarWebSocket();
    };
  }, [codigoCasal, userName]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleSendVerse = async () => {
    if (!newVerse.trim() || !reference.trim()) return;

    try {
      console.log("📤 Enviando devocional...");
      await criarDevocional({
        codigoCasal,
        autor: userName,
        versiculo: newVerse,
        referencia: reference,
      });

      console.log("✅ Devocional enviado com sucesso!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Buscar devocional atualizado
      const atualizado = await buscarDevocional(codigoCasal, userName);
      setCurrentVerse(atualizado);

      setNewVerse("");
      setReference("");
    } catch (error) {
      console.error("❌ Erro ao enviar devocional:", error);
    }
  };

  const handleReaction = async (tipo: TipoReacao) => {
    if (!currentVerse) return;

    // Atualização otimista na UI
    setCurrentVerse((prev) => {
      if (!prev) return prev;

      const novaContagem = {
        CORACAO: prev.contagemReacoes.CORACAO ?? 0,
        AMEM: prev.contagemReacoes.AMEM ?? 0,
        FOGO: prev.contagemReacoes.FOGO ?? 0,
      };

      if (prev.minhaReacao) {
        novaContagem[prev.minhaReacao] = Math.max(
          0,
          novaContagem[prev.minhaReacao] - 1,
        );
      }

      if (prev.minhaReacao === tipo) {
        return {
          ...prev,
          minhaReacao: null,
          contagemReacoes: novaContagem,
        };
      }

      novaContagem[tipo]++;

      return {
        ...prev,
        minhaReacao: tipo,
        contagemReacoes: novaContagem,
      };
    });

    try {
      await reagir({
        devocionalId: currentVerse.id,
        autor: userName,
        tipoReacao: tipo,
      });
      console.log("✅ Reação enviada:", tipo);
    } catch (error) {
      console.error("❌ Erro ao enviar reação:", error);
    }
  };

  return (
    <LinearGradient
      colors={[colors.rose50, colors.white, colors.pink50]}
      style={styles.container}
    >
      {showNotification && (
        <Notification
          isOpen={showNotification}
          onClose={() => setShowNotification(false)}
        />
      )}
      {showSuccess && <SuccessAlert />}
      {showNotificationReaction && <NotificationReaction />}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 16) + 16,
            paddingBottom: Math.max(insets.bottom, 16) + bottomPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        bounces={false}
      >
        <Header
          userName={userName}
          isConnected={isConnected}
          onLogout={handleLogout}
        />

        {currentVerse ? (
          <VerseCard devocional={currentVerse} onReact={handleReaction} />
        ) : (
          <EmptyState />
        )}

        <LinearGradient
          colors={[colors.white, colors.rose50]}
          style={styles.formCard}
        >
          <VerseForm
            verse={newVerse}
            reference={reference}
            onVerseChange={setNewVerse}
            onReferenceChange={setReference}
            onSubmit={handleSendVerse}
            disabled={!newVerse.trim() || !reference.trim()}
          />
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.rose50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 32,
  },
  formCard: {
    backgroundColor: colors.rose50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.stone200,
    padding: 24,
    shadowColor: colors.stone300,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
