import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      <Text style={{ color: colors.red, marginBottom: 12, textAlign: "center" }}>{message}</Text>
      <TouchableOpacity
        onPress={onRetry}
        style={{ backgroundColor: colors.blue, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 4 }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>THỬ LẠI</Text>
      </TouchableOpacity>
    </View>
  );
}
