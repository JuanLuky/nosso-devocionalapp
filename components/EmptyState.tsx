import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.stone100, colors.stone200]}
        style={styles.iconContainer}

      >
        <Ionicons name="book-outline" size={32} color={colors.stone400} />
      </LinearGradient>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Nenhum versículo ainda</Text>
        <Text style={styles.subtitle}>
          Seja o primeiro a compartilhar{"\n"}uma palavra de esperança e fé
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.stone200,
    borderStyle: "dashed",
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    gap: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.stone700,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.stone500,
    textAlign: "center",
    lineHeight: 20,
  },
});
