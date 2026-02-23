import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface SearchScreenProps {
  id: string;
  title: string;
  description: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchScreenProps[]>([]);

  const insets = useSafeAreaInsets();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      // Filter or fetch results based on query
      setResults([
        { id: "1", title: "Result 1", description: "Description 1" },
        { id: "2", title: "Result 2", description: "Description 2" },
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.resultItem}>
          <Text style={styles.resultTitle}>{item.title}</Text>
          <Text style={styles.resultDescription}>{item.description}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingTop: Math.max(insets.top, 16) + 16,
          paddingBottom: Math.max(insets.bottom, 16) + 16,
        },
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      ListHeaderComponent={
        <View style={styles.container}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 32,
  },
  searchInput: {
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: "#666",
  },
});
