// src/components/Header.tsx

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "@/utils/colors";

interface HeaderProps {
  userName: string;
  isConnected: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  isConnected,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.leftContent}>
          <LinearGradient
            colors={[colors.rose400, colors.pink500]}
            style={styles.iconContainer}
          >
            <Ionicons name="heart" size={32} color={colors.white} />
          </LinearGradient>

          <View>
            <Text style={styles.title}>Nosso{"\n"}Devocional</Text>
            <Text style={styles.subtitle}>Compartilhando fé e amor</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.stone400} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={[colors.stone50, colors.rose50]}
        style={styles.statusCard}
      >
        <View style={styles.statusLeft}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isConnected
                  ? colors.emerald500
                  : colors.stone300,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {isConnected ? "CONECTADO" : "CONECTANDO..."}
          </Text>
        </View>

        <View style={styles.statusRight}>
          <LinearGradient
            colors={[colors.rose400, colors.pink500]}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </LinearGradient>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftContent: {
    flexDirection: "row",
    gap: 16,
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.rose500,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 12,
    color: colors.stone500,
    marginTop: 2,
  },
  logoutButton: {
    padding: 12,
    marginRight:8,
    backgroundColor: colors.stone50,
    borderRadius: 12,
  },
  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.stone200,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.stone600,
    letterSpacing: 1,
  },
  statusRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.white,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.stone700,
  },
});
