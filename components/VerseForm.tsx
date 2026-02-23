import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../utils/colors";

interface VerseFormProps {
  verse: string;
  reference: string;
  onVerseChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const VerseForm: React.FC<VerseFormProps> = ({
  verse,
  reference,
  onVerseChange,
  onReferenceChange,
  onSubmit,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Versículo</Text>
        <TextInput
          value={verse}
          onChangeText={onVerseChange}
          placeholder="Compartilhe um versículo que te inspirou hoje..."
          placeholderTextColor={colors.stone400}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={styles.textArea}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Referência</Text>
        <TextInput
          value={reference}
          onChangeText={onReferenceChange}
          placeholder="Ex: João 3:16"
          placeholderTextColor={colors.stone400}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            disabled
              ? [colors.stone400, colors.stone400]
              : [colors.rose500, colors.pink500]
          }
          style={styles.button}
        >
          <Ionicons name="send" size={20} color={colors.white} />
          <Text style={styles.buttonText}>Compartilhar Palavra</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.stone700,
  },
  textArea: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.stone200,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.stone700,
    minHeight: 180,
    fontStyle: "italic",
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.stone200,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.stone700,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: colors.stone400,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
