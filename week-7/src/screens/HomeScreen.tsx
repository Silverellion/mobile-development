import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { useCart } from "../store/hooks";
import { filterBooks, PriceRange } from "../utils/filters";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors } from "../theme";
export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sortByPrice, setSortByPrice] = useState<"asc" | "desc" | null>(null);
  const debouncedKeyword = useDebounce(keyword, 400);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookList, categoryList] = await Promise.all([getBooks(), getCategories()]);
      setBooks(bookList);
      setCategories(categoryList);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    if (!sortByPrice) return filtered;
    return [...filtered].sort((a, b) =>
      sortByPrice === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [books, debouncedKeyword, categoryId, priceRange, sortByPrice]);
  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null || sortByPrice !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
    setSortByPrice(null);
  };
  const toggleSort = () => {
    setSortByPrice((prev) => (prev === null ? "asc" : prev === "asc" ? "desc" : null));
  };
  const header = (
    <View>
      <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
      <PriceFilter value={priceRange} onChange={setPriceRange} />
      <View style={styles.actionRow}>
        <Pressable onPress={toggleSort} style={[styles.sortBtn, sortByPrice !== null && styles.sortBtnActive]}>
          <Text style={[styles.sortText, sortByPrice !== null && styles.sortTextActive]}>
            {sortByPrice === "asc" ? "↑ Giá tăng dần" : sortByPrice === "desc" ? "↓ Giá giảm dần" : "⇅ Sắp xếp giá"}
          </Text>
        </Pressable>
        {hasFilter && (
          <Pressable onPress={clearFilters} style={styles.clearBtn}>
            <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}
      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid
          data={visibleBooks}
          onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
          ListHeaderComponent={header}
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }
        />
      )}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  actionRow: { flexDirection: "row", alignItems: "center", marginLeft: 12, marginBottom: 6, gap: 8 },
  sortBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: "#E5E7EB" },
  sortBtnActive: { backgroundColor: colors.indigo },
  sortText: { color: colors.text, fontWeight: "600", fontSize: 12 },
  sortTextActive: { color: "#fff" },
  clearBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: "#FEE2E2" },
  clearText: { color: colors.danger, fontWeight: "700", fontSize: 12 },
});
