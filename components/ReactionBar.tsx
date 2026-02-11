// src/components/ReactionBar.tsx

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { TipoReacao } from "../types";
import { colors } from "../utils/colors";

interface ReactionBarProps {
  counts: {
    CORACAO: number;
    AMEM: number;
    FOGO: number;
  };
  minhaReacao: TipoReacao | null;
  onReact: (tipo: TipoReacao) => void;
}

export const ReactionBar: React.FC<ReactionBarProps> = ({
  counts,
  minhaReacao,
  onReact,
}) => {
  const reactions = [
    { tipo: "CORACAO" as TipoReacao, emoji: "❤️", label: "Amei" },
    { tipo: "AMEM" as TipoReacao, emoji: "🙏", label: "Amém" },
    { tipo: "FOGO" as TipoReacao, emoji: "🔥", label: "Fogo" },
  ];

  return (
    <View style={styles.container}>
      {reactions.map(({ tipo, emoji, label }) => {
        const count = counts[tipo] || 0;
        const isActive = minhaReacao === tipo;

        return (
          <TouchableOpacity
            key={tipo}
            onPress={() => onReact(tipo)}
            activeOpacity={0.7}
          >
            {isActive ? (
              <LinearGradient
                colors={[colors.rose500, colors.pink500]}
                style={styles.reactionButton}
              >
                <Text style={styles.emojiActive}>{emoji}</Text>
                {count > 0 && <Text style={styles.countActive}>{count}</Text>}
              </LinearGradient>
            ) : (
              <View style={styles.reactionButtonInactive}>
                <Text style={styles.emoji}>{emoji}</Text>
                {count > 0 && <Text style={styles.count}>{count}</Text>}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  reactionButtonInactive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.stone200,
  },
  emoji: {
    fontSize: 16,
  },
  emojiActive: {
    fontSize: 18,
  },
  count: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.stone600,
  },
  countActive: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
