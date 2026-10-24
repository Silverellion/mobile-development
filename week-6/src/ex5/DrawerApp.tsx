import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();
function HomeScreen() {
  return <View style={s.center}><Text style={s.big}>Xin chào 👋</Text></View>;
}
function ProfileScreen() {
  return (
    <View style={s.center}>
      <View style={s.avatar}><Text style={s.avatarText}>HT</Text></View>
      <Text style={s.big}>Hoàng Trí Minh Tâm</Text>
      <Text style={s.muted}>test@example.com</Text>
    </View>
  );
}

// TODO 1: SettingsScreen — 2 state: notify (mặc định true) và dark (mặc định false).
// Mỗi dòng: <Text>Nhận thông báo</Text> <Switch value={notify} onValueChange={setNotify} />
// Dòng cuối hiển thị: "Thông báo: BẬT/TẮT · Giao diện: tối/sáng".
function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={s.row}>
        <Text>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.row}>
        <Text>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={{ marginTop: 20 }}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// TODO 2: export function DrawerANM.x!~$x> <kpp() — NavigationContainer > Drawer.Navigator
// drawerIcon: Ionicons theo tên route (home-outline / person-outline / settings-outline)
// drawerActiveTintColor: colors.red; 3 Drawer.Screen với title tiếng Việt.
export function DrawerApp() {
  const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
    Home: "home-outline",
    Profile: "person-outline",
    Settings: "settings-outline",
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerIcon: ({ color, size }) => (
            <Ionicons name={ICONS[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  big: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  muted: { color: colors.muted },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.line },
});
