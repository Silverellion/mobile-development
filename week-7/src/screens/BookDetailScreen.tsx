import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { PrimaryButton } from "../components/PrimaryButton";
import { HeartButton } from "../components/HeartButton";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";
export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);
  useEffect(() => {
    load();
  }, [load]);
  if (loading) return <LoadingView />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
        <HeartButton bookId={book.id} size={40} />
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <PrimaryButton
        title="Thêm vào giỏ"
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 10, paddingBottom: 40 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8 },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginVertical: 4 },
});
