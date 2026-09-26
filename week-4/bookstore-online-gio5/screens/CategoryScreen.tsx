// GIỜ 5 — Tab "Danh mục": tích hợp nội dung Giờ 2
// Category Chips (flexWrap) + Book Grid (2 cột, flexWrap hoặc gap).
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { BOOKS } from "../data";

export function CategoryScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Danh mục</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục (flexWrap)</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Lưới sách (2 cột)</Text>
        <BookGrid books={BOOKS} onPressBook={(id) => console.log("Mở sách", id)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // chừa chỗ cho TabBar (64px) không che phần tử cuối
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 4,
  },
});
