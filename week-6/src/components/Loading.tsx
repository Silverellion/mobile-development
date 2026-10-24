import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

export function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 8 }}>Đang tải...</Text>
    </View>
  );
}
