import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";

export const SuccessAlert: React.FC = () => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={24} color={colors.emerald600} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Versículo compartilhado!</Text>
        <Text style={styles.subtitle}>Sua palavra foi enviada com amor</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: colors.white,
    borderLeftWidth: 4,
    borderLeftColor: colors.emerald500,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 1000,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.emerald100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.stone800,
  },
  subtitle: {
    fontSize: 13,
    color: colors.stone500,
    marginTop: 2,
  },
});
