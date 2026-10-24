import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { TabProps } from "./types";
import { Phone } from "../types";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.name}>{phone.name.split(" - ")[0]}</Text>
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>
    </TouchableOpacity>
  );
}

// TODO 3: FlatList data={PHONES}; mỗi dòng là <ProductRow phone={item} onPress={...} />
// onPress: navigation.navigate("ProductDetails", { id: item.id })
export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 10,
  },
  row: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    color: colors.red,
  },
});
