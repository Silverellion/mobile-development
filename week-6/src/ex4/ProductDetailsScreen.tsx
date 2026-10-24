import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { RootProps } from "./types";
import { useFavorites } from "./FavoritesContext";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
const { id } = route.params; // TODO 4: lấy id rồi tìm phone trong PHONES
const { has, toggle } = useFavorites();
const phone = PHONES.find((p) => p.id === id);

// TODO 5: không tìm thấy → "Không tìm thấy sản phẩm #id"
if (!phone) {
  return (
    <View style={styles.center}>
      <Text>Không tìm thấy sản phẩm #{id}</Text>
    </View>
  );
}

// TODO 6: hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp
// TODO 7: nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" → toggle(phone.id)
return (
  <View style={styles.container}>
    <Image
      source={PHONE_COLORS[phone.defaultColor].image}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.name}>{phone.name}</Text>
    <View style={styles.row}>
      <Stars value={phone.rating} />
    </View>
    <Text style={styles.price}>{formatPrice(phone.price)}</Text>
    <Text style={styles.supplier}>Cung cấp bởi: {phone.supplier}</Text>

    <TouchableOpacity style={styles.favBtn} onPress={() => toggle(phone.id)}>
      <Text style={styles.favBtnText}>
        {has(phone.id) ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
      </Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    marginVertical: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  supplier: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  favBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  favBtnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
