import React, { createContext, useContext, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

// ── Dark mode context ────────────────────────────────────────────────────────
type DarkCtx = { dark: boolean; setDark: (v: boolean) => void };
const DarkContext = createContext<DarkCtx>({ dark: false, setDark: () => {} });
const useDark = () => useContext(DarkContext);

// ── Screens ──────────────────────────────────────────────────────────────────
type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  const { dark } = useDark();
  const bg = dark ? "#121212" : "#fff";
  const fg = dark ? "#f0f0f0" : colors.text;
  return (
    <View style={[s.center, { backgroundColor: bg, flex: 1 }]}>
      <Text style={[s.big, { color: fg }]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useDark();
  const bg = dark ? "#121212" : "#fff";
  const fg = dark ? "#f0f0f0" : colors.text;
  const muted = dark ? "#9ca3af" : colors.muted;
  return (
    <View style={[s.center, { backgroundColor: bg, flex: 1 }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>HT</Text>
      </View>
      <Text style={[s.big, { color: fg }]}>Hoàng Trí Minh Tâm</Text>
      <Text style={{ color: muted }}>test@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const { dark, setDark } = useDark();
  const [notify, setNotify] = useState(true);
  const bg = dark ? "#121212" : "#fff";
  const fg = dark ? "#f0f0f0" : colors.text;
  const border = dark ? "#2d2d2d" : colors.line;
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: bg }}>
      <View style={[s.row, { borderColor: border }]}>
        <Text style={{ color: fg }}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} trackColor={{ true: colors.red }} />
      </View>
      <View style={[s.row, { borderColor: border }]}>
        <Text style={{ color: fg }}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} trackColor={{ true: colors.red }} />
      </View>
      <Text style={{ marginTop: 20, color: fg }}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

export function DrawerApp() {
  const [dark, setDark] = useState(false);

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
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
    </DarkContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  big: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.navy, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.line },
});
