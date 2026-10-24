import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { PHONES } from "../data/phones";
import { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductsTab";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  // TODO 8: lấy ids từ useFavorites(); lọc PHONES theo ids; danh sách rỗng → "Chưa có sản phẩm nào được lưu."
  // bấm một dòng cũng mở ProductDetails như Tab1.
  const { ids } = useFavorites();
  const favPhones = PHONES.filter((p) => ids.includes(p.id));

  if (favPhones.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favPhones}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
    gap: 10,
  },
});
