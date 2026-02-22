import AnimatedMaskedText from "@/components/molecules/animated-masked-text/AnimatedMaskedText";
import { colors } from "@/utils/colors";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function TitleAnimate({
  children,
  style,
}: {
  children: string;
  style?: any;
}) {
  const [fontLoaded] = useFonts({
    SfProRounded: require("@/assets/fonts/SfProRoundedMedium.ttf"),
    HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <AnimatedMaskedText
          style={{
            fontSize: 36,
            fontWeight: "500",
            marginBottom: -14,
            ...style,
          }}
          baseTextColor={colors.rose500}
        >
          {children}
        </AnimatedMaskedText>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    gap: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
  },
});
