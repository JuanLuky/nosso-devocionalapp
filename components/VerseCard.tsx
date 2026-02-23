import { FontAwesome5 } from "@expo/vector-icons";

import type { Devocional, TipoReacao } from "@/types";
import { colors } from "@/utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ReactionBar } from "./ReactionBar";

interface VerseCardProps {
  devocional: Devocional;
  onReact: (tipo: TipoReacao) => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({
  devocional,
  onReact,
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={[colors.white, colors.rose50]}
        style={styles.card}
      >
        {/* Decorative blur circles */}
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />

        <View style={styles.content}>
          {/* Verse Content */}
          <View style={styles.verseSection}>
            <LinearGradient
              colors={[colors.rose400, colors.pink500]}
              style={styles.iconBox}
            >
              <FontAwesome5 name="bible" size={20} color={colors.white} />
            </LinearGradient>

            <View style={styles.verseContent}>
              <Text style={styles.verseText}>"{devocional.versiculo}"</Text>
              <Text style={styles.reference}>{devocional.referencia}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.authorSection}>
              <LinearGradient
                colors={[colors.rose400, colors.pink500]}
                style={styles.authorAvatar}
              >
                <Text style={styles.authorAvatarText}>
                  {devocional.autor?.charAt(0)?.toUpperCase() ?? "?"}
                </Text>
              </LinearGradient>
              <View>
                <Text style={styles.authorName}>{devocional.autor}</Text>
                <Text style={styles.date}>{formatDate(devocional.data)}</Text>
              </View>
            </View>

            <ReactionBar
              counts={devocional.contagemReacoes}
              minhaReacao={devocional.minhaReacao}
              onReact={onReact}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {},
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.stone200,
    overflow: "hidden",
  },
  decorTop: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    backgroundColor: colors.rose200,
    opacity: 0.2,
    borderRadius: 64,
  },
  decorBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 96,
    height: 96,
    backgroundColor: colors.amber100,
    opacity: 0.3,
    borderRadius: 48,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 24,
    gap: 24,
  },
  verseSection: {
    flexDirection: "row",
    gap: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  verseContent: {
    flex: 1,
    gap: 16,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.stone800,
    fontStyle: "italic",
  },
  reference: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.rose600,
    letterSpacing: 0.5,
  },
  footer: {
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.stone200,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  authorAvatarText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.stone700,
  },
  date: {
    fontSize: 11,
    color: colors.stone400,
    marginTop: 2,
  },
});
