import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";
export function CheckoutScreen({ route }: RootScreenProps<"Checkout">) {
  const { total } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
        <Text style={styles.total}>{formatPrice(total)}</Text>
        <Text style={styles.hint}>(Form địa chỉ & thanh toán sẽ làm ở buổi sau)</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    color: colors.muted,
    marginBottom: 12,
  },
  total: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.indigo,
    marginBottom: 16,
  },
  hint: {
    fontSize: 13,
    color: colors.muted,
    fontStyle: "italic",
    textAlign: "center",
  },
});
