import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/colors";

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  isOpen,
  onClose,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [isOpen]);

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <LinearGradient
            colors={[colors.white, colors.rose50]}
            style={styles.notification}
          >
            <MaterialCommunityIcons
              name="email-alert"
              size={32}
              color={colors.rose500}
            />

            <Text style={styles.title}>Nova Palavra Recebida</Text>
            <Text style={styles.subtitle}>
              Seu amor acabou de compartilhar um novo devocional com você.
            </Text>

            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Ver Agora</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    width: "85%",
  },
  notification: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    gap: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.rose500,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.stone500,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.rose500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: colors.rose100,
    fontWeight: "600",
    fontSize: 12,
  },
});
