import AnimatedText from "@/components/organisms/animated-text";
import { colors } from "@/utils/colors";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function LogoTitle() {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/SfProRoundedMedium.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  const TEXTS: string[] = [
    "Compartilhe fé e amor",
    "Com quem você ama",
    "Com quem precisa",
    "Com quem quer ouvir",
    "Com quem quer compartilhar",
  ];

  const [text, setText] = useState<string>(TEXTS[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % TEXTS.length;
      setText(TEXTS[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <AnimatedText
          text={text}
          animationConfig={{
            spring: {
              damping: 15,
              stiffness: 210,
              mass: 1,
            },
            characterDelay: 15,
            maxBlurIntensity: 50,
          }}
          enterFrom={{
            opacity: 0,
            translateY: 55,
            scale: 0.2,
            rotate: 0,
          }}
          exitFrom={{
            opacity: 1,
            translateY: 0,
            scale: 1,
            rotate: 0,
          }}
          style={{
            marginTop: -10,
            color: colors.stone500,
            fontSize: 20,
            fontFamily: fontLoaded ? "SfProRounded" : undefined,
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  info: {},
  year: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
  },
  name: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
  },
  artist: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
  },
});
