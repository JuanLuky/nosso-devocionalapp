import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors } from "../utils/colors";

interface NotificationProps {
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <LinearGradient
        colors={[colors.rose500, colors.pink500]}
        style={styles.notification}
      >
        <Ionicons name="heart" size={24} color={colors.white} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Novo versículo!</Text>
          <Text style={styles.subtitle}>Seu amor compartilhou uma palavra</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={20} color={colors.white} />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 64,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  subtitle: {
    fontSize: 13,
    color: colors.rose100,
    marginTop: 2,
  },
});
