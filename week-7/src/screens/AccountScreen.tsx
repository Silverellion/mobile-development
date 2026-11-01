import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../store/hooks";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";
export function AccountScreen({}: TabScreenProps<"Account">) {
  const { user, isLoggedIn, signIn, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Header title="👤 Tài khoản" />
      <View style={styles.content}>
        {isLoggedIn && user ? (
          <View style={styles.card}>
            <Text style={styles.avatar}>🙂</Text>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <View style={styles.actions}>
              <PrimaryButton title="Đăng xuất" variant="outline" onPress={signOut} />
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.avatar}>🔒</Text>
            <Text style={styles.name}>Bạn chưa đăng nhập</Text>
            <View style={styles.actions}>
              <PrimaryButton
                title="Đăng nhập thử (dữ liệu giả)"
                onPress={() =>
                  signIn({ id: 1, name: "Học viên Demo", email: "demo@bookstore.vn" }, "fake-token")
                }
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, padding: 24, justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: { fontSize: 64, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "800", color: colors.text, marginBottom: 4 },
  email: { color: colors.muted, fontSize: 14, marginBottom: 20 },
  actions: { width: "100%", marginTop: 8 },
});
