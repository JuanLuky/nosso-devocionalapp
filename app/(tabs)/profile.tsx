import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
  });

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: Math.max(insets.top, 16) + 16,
          paddingBottom: Math.max(insets.bottom, 16) + 16,
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      bounces={false}
    >
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.optionItem}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </View>
        <View style={styles.optionItem}>
          <Text style={styles.optionText}>Preferences</Text>
        </View>
        <View style={styles.optionItem}>
          <Text style={styles.optionText}>Logout</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 32,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 10,
  },
  optionItem: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
