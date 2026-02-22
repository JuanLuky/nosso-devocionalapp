import { LogoTitle } from "@/components/LogoTitle";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { login as loginApi } from "../../services/api/authService";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState("");
  const [codigoCasal, setCodigoCasal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [keyboardHeights, setKeyboardHeights] = useState(0);

  const bottomPadding = Math.min(keyboardHeights, 220);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeights(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeights(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!userName.trim() || !codigoCasal.trim()) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Chama o endpoint de login do backend
      const response = await loginApi({
        codigoCasal: codigoCasal.trim().toUpperCase(),
        usuario: userName.trim(),
      });

      // Salva a sessão no store
      await login({
        usuario: userName.trim(),
        codigoCasal: codigoCasal.trim().toUpperCase(),
      });

      // Navega para a home (o _layout.tsx vai redirecionar automaticamente)
      router.replace("/(tabs)");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro ao fazer login. Tente novamente.";

      setError(errorMessage);

      Alert.alert("Erro no Login", errorMessage, [
        { text: "OK", style: "cancel" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.white, colors.rose50, colors.rose50, colors.rose300]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 20),
            paddingBottom: Math.max(insets.bottom, 20) + bottomPadding,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollView}
        scrollEnabled={true}
        bounces={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={[colors.rose400, colors.pink500]}
              style={styles.logoContainer}
            >
              <Ionicons name="heart" size={48} color={colors.white} />
            </LinearGradient>

            <Text style={styles.title}>Nosso{"\n"}Devocional</Text>

            <LogoTitle />
          </View>

          {/* Form */}
          <LinearGradient
            colors={[colors.white, colors.rose50]}
            style={styles.form}
          >
            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color={colors.rose600}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Seu Nome</Text>
              <View
                style={[styles.inputWrapper, error && styles.inputWrapperError]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={error ? colors.rose400 : colors.stone400}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={userName}
                  onChangeText={(text) => {
                    setUserName(text);
                    setError("");
                  }}
                  placeholder="Digite seu nome"
                  placeholderTextColor={colors.stone400}
                  style={styles.input}
                  autoCapitalize="words"
                  editable={!isLoading}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Código do Casal</Text>
              <View
                style={[styles.inputWrapper, error && styles.inputWrapperError]}
              >
                <Ionicons
                  name="key-outline"
                  size={20}
                  color={error ? colors.rose400 : colors.stone400}
                  style={styles.inputIcon}
                />
                <TextInput
                  value={codigoCasal}
                  onChangeText={(text) => {
                    setCodigoCasal(text);
                    setError("");
                  }}
                  placeholder="Ex: JOAO-MARIA"
                  placeholderTextColor={colors.stone400}
                  style={styles.input}
                  autoCapitalize="characters"
                  editable={!isLoading}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
              </View>
              <Text style={styles.hint}>Use o formato: NOME1-NOME2</Text>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={!userName.trim() || !codigoCasal.trim() || isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  !userName.trim() || !codigoCasal.trim() || isLoading
                    ? [colors.stone200, colors.stone300]
                    : [colors.rose500, colors.pink500]
                }
                style={styles.button}
              >
                {isLoading ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <>
                    <Ionicons
                      name="log-in-outline"
                      size={24}
                      color={colors.white}
                    />
                    <Text style={styles.buttonText}>Entrar</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              "A palavra de Deus é viva e eficaz"
            </Text>
            <Text style={styles.footerReference}>— Hebreus 4:12</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  content: {
    gap: 48,
  },
  header: {
    alignItems: "center",
    gap: 16,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.rose500,
    textAlign: "center",
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 16,
    color: colors.stone500,
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    gap: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.rose50,
    borderWidth: 1,
    borderColor: colors.rose200,
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: colors.rose600,
    fontWeight: "500",
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.stone700,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.stone50,
    borderWidth: 2,
    borderColor: colors.stone200,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputWrapperError: {
    borderColor: colors.rose400,
    backgroundColor: colors.rose50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.stone700,
  },
  hint: {
    fontSize: 12,
    color: colors.stone400,
    fontStyle: "italic",
    marginTop: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 18,
    borderRadius: 12,
    minHeight: 56,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  footer: {
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: colors.stone600,
    fontStyle: "italic",
    textAlign: "center",
  },
  footerReference: {
    fontSize: 12,
    color: colors.stone600,
    textAlign: "center",
  },
});
