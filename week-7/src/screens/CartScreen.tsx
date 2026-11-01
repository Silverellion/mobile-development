import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog";
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";
export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const askRemove = (bookId: number) => {
    const item = items.find((i) => i.bookId === bookId);
    confirmDialog("Xóa sản phẩm", `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, () => remove(bookId));
  };
  const goCheckout = () => {
    navigation.navigate("Checkout", { total: totalPrice });
  };
  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState
            emoji="🛒"
            title="Giỏ hàng trống"
            message="Hãy chọn vài cuốn sách yêu thích nhé."
            actionLabel="Khám phá sách"
            onAction={() => navigation.navigate("Home")}
          />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.line}>
            <Text style={styles.totalLabel}>Tổng cộng: {formatPrice(totalPrice)}</Text>
          </View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { fontSize: 16, fontWeight: "800", color: colors.navy },
});
