import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, checkSession } = useAuthStore();

  // 1. Estado para evitar navegação prematura
  const [isReady, setIsReady] = useState(false);

  // 2. Inicialização da sessão
  useEffect(() => {
    async function initialize() {
      await checkSession();
      setIsReady(true);
    }
    initialize();
  }, []);

  // 3. Monitoramento de autenticação e rotas
  useEffect(() => {
    // Se ainda está carregando ou o roteador não montou, cancela a execução
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redireciona para o login se não estiver autenticado
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Redireciona para as tabs se estiver autenticado e tentar acessar login
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, isReady]);

  // 4. Enquanto checa a sessão, podemos exibir nada (ou um SplashScreen)
  if (!isReady) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        {/* Definimos apenas as portas de entrada dos grupos */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
