import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/utils/colors";
import {
    Entypo,
    FontAwesome6,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useRouter, useSegments } from "expo-router";
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
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            height: 60,
            marginHorizontal: 100,
            borderRadius: 30,
            borderTopWidth: 0,
            elevation: 0,
            backgroundColor: "transparent", // importante
            overflow: "hidden", // pra cortar o gradiente no radius
          },

          tabBarBackground: () => (
            <LinearGradient
              colors={[colors.rose300, colors.rose500]} // exemplo rose gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1 }}
            />
          ),
          tabBarItemStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                style={{ marginBottom: -18 }}
                name="home"
                size={22}
                color={focused ? colors.rose50 : colors.stone600}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome6
                style={{ marginBottom: -18 }}
                name="book-bible"
                size={22}
                color={focused ? colors.rose50 : colors.stone600}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                style={{ marginBottom: -18 }}
                name="face-man-profile"
                size={22}
                color={focused ? colors.rose50 : colors.stone600}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
