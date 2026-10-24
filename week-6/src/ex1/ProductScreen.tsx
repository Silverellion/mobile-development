import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { SelectPhoneParamList } from "./SelectPhoneApp";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
const picked = route.params?.color;
const shown = picked ?? phone.defaultColor;
return (
<SafeAreaView style={styles.root}>
<View style={styles.imageWrap}>
<Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
</View>
<View style={styles.info}>
<Text style={styles.name}>{phone.name}</Text>
<View style={styles.row}><Stars value={phone.rating} /><Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text></View>
<View style={styles.row}>
<Text style={styles.price}>{formatPrice(phone.price)}</Text>
<Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>{/* gạch ngang */}
</View>
<View style={styles.row}><Text style={styles.badge}>{phone.badge}</Text>{/* vòng tròn có dấu ? */}</View>
{/* ===== TODO 1 + TODO 2 ở bên dưới ===== */}
{/* TODO 1: nút viền xám, bo góc 6, chữ "4 MÀU-CHỌN MÀU"; nếu đã chọn màu (picked) thì chữ là "4 MÀU-CHỌN LOẠI".
    Dấu ">" nằm sát lề phải (position:"absolute", right:12).
    Bấm → navigation.navigate("ChooseColor", { color: picked }) */}
<Pressable style={styles.chooseBtn} onPress={() => navigation.navigate("ChooseColor", { color: picked })}>
  <Text>{picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}</Text>
  <Text style={styles.arrow}>{">"}</Text>
</Pressable>
</View>
{/* TODO 2: nút "CHỌN MUA": nền colors.red, bo góc 6, chữ trắng đậm, canh giữa, nằm SÁT ĐÁY màn hình
    (đặt ngoài khối info, sau nó; gợi ý: root là flex column, imageWrap có flex:1). */}
<Pressable style={styles.buyBtn}>
  <Text style={styles.buyBtnText}>CHỌN MUA</Text>
</Pressable>
</SafeAreaView>
);
}
// styles: root {flex:1, backgroundColor:"#fff", paddingHorizontal:16}, imageWrap {flex:1, ...}, ...
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300 },
  info: { paddingBottom: 16 },
  name: { fontSize: 15, marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  review: { marginLeft: 16 },
  price: { fontSize: 18, fontWeight: "bold", marginRight: 16 },
  oldPrice: { textDecorationLine: "line-through", color: colors.muted },
  badge: { color: colors.red, fontWeight: "bold", marginRight: 6 },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    position: "relative",
  },
  arrow: { position: "absolute", right: 12, fontSize: 16, fontWeight: "bold" },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
