import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();
// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
Home: ["home", "home-outline"],
Search: ["search", "search-outline"],
Profile: ["person", "person-outline"],
};
function HomeTab() {
return (
<FlatList data={PHONES} keyExtractor={(p) => p.id} contentContainerStyle={{ padding: 16, gap: 10 }}
renderItem={({ item }) => (<View style={s.card}><Text>{item.name.split(" - ")[0]}</Text></View>)} />
);
}

// TODO 1: SearchTab — const [keyword, setKeyword] = useState("");
// <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} />
// Lọc PHONES theo keyword (không phân biệt hoa/thường: toLowerCase + includes), hiển thị kết quả.
// Không có kết quả → hiện "Không có kết quả cho “...”".
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const filtered = PHONES.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} />
      {filtered.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10, marginTop: 10 }}
          renderItem={({ item }) => (<View style={s.card}><Text>{item.name.split(" - ")[0]}</Text></View>)}
        />
      )}
    </View>
  );
}

// TODO 2: ProfileTab — vòng tròn Avatar (View bo tròn width=height=96, borderRadius=48, hiện chữ cái đầu)
// + Name (chữ lớn, đậm) + 1 dòng email. Canh giữa màn hình.
function ProfileTab() {
  return (
    <View style={s.center}>
      <View style={s.avatar}><Text style={s.avatarText}>NA</Text></View>
      <Text style={s.name}>Nguyễn Văn An</Text>
      <Text style={s.email}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 3: export function BottomTabApp() — NavigationContainer > Tab.Navigator với screenOptions:
// tabBarActiveTintColor: colors.red,
// tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} .../>
// 3 Tab.Screen, đặt title tiếng Việt (Trang chủ / Tìm kiếm / Cá nhân).
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 8, borderWidth: 1, borderColor: colors.line },
  input: { borderWidth: 1, borderColor: colors.line, borderRadius: 8, padding: 12, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  email: { color: colors.muted },
});
