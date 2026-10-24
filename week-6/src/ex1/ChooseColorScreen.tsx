import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
const [line1, line2] = phone.name.split(" - ");     // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

return (
<View style={styles.root}>
<View style={styles.header}>
  <Image source={PHONE_COLORS[picked ?? phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
  <View style={styles.headerText}>
    <Text style={styles.small}>{line1}</Text>
    <Text style={styles.small}>{line2}</Text>
    {/* TODO 3 */}
    {/* TODO 3: CHỈ KHI đã chọn màu (picked khác undefined) hiện thêm 3 dòng dưới tên sản phẩm:
        Màu: <PHONE_COLORS[picked].label> ← tên màu IN ĐẬM
        Cung cấp bởi <phone.supplier> ← nhà cung cấp IN ĐẬM
        <formatPrice(phone.price)> ← giá, chữ đậm
        (dùng toán tử && hoặc ? : trong JSX; Fragment <>...</> để gộp nhiều dòng) */}
    {picked && (
      <>
        <Text style={styles.small}>Màu: <Text style={{ fontWeight: "bold" }}>{PHONE_COLORS[picked].label}</Text></Text>
        <Text style={styles.small}>Cung cấp bởi <Text style={{ fontWeight: "bold" }}>{phone.supplier}</Text></Text>
        <Text style={[styles.small, { fontWeight: "bold" }]}>{formatPrice(phone.price)}</Text>
      </>
    )}
  </View>
</View>

<View style={styles.body}>
  <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
  <View style={styles.swatches}>
    {COLOR_ORDER.map((key) => (
      <Pressable key={key} onPress={() => setPicked(key)}
        style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]} />
    ))}
  </View>
  {/* TODO 4 */}
  {/* TODO 4: nút "XONG": nền colors.blue, bo góc 4, chữ trắng đậm.
      Bấm → navigation.navigate("Product", { color: picked }, { merge: true }) */}
  <Pressable
    style={styles.doneBtn}
    onPress={() => (navigation.navigate as any)("Product", { color: picked }, { merge: true })}
  >
    <Text style={styles.doneBtnText}>XONG</Text>
  </Pressable>
</View>
</View>
);
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16 },
  thumb: { width: 100, height: 120 },
  headerText: { marginLeft: 12 },
  small: { fontSize: 14, marginVertical: 2 },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, justifyContent: "space-between" },
  hint: { fontSize: 16 },
  swatches: { alignItems: "center", gap: 10 },
  swatch: { width: 80, height: 80 },
  swatchOn: { borderWidth: 3, borderColor: "#fff" },
  doneBtn: { backgroundColor: colors.blue, borderRadius: 4, paddingVertical: 12, alignItems: "center" },
  doneBtnText: { color: "#fff", fontWeight: "bold" },
});
