import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

export default function App() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backBtn}>
            <Text style={styles.backText}>← Menu</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <View style={{ flex: 1 }}>
          {selected === 1 && <SelectPhoneApp phone={PHONES[0]} />}
          {selected === 2 && <SelectPhoneApi />}
          {selected === 3 && <BottomTabApp />}
          {selected === 4 && <StackTabApp />}
          {selected === 5 && <DrawerApp />}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.menu}>
      <Text style={styles.title}>Lab 6 — Navigation</Text>
      <TouchableOpacity style={styles.btn} onPress={() => setSelected(1)}>
        <Text style={styles.btnText}>Bài 1: Select Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => setSelected(2)}>
        <Text style={styles.btnText}>Bài 2: Gắn API</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => setSelected(3)}>
        <Text style={styles.btnText}>Bài 3: Bottom Tab</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => setSelected(4)}>
        <Text style={styles.btnText}>Bài 4: Stack + Tab + Passing Params</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => setSelected(5)}>
        <Text style={styles.btnText}>Bài 5: Drawer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menu: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  btn: { backgroundColor: "#eee", padding: 14, borderRadius: 6, marginVertical: 6 },
  btnText: { fontSize: 16, textAlign: "center" },
  topBar: { backgroundColor: "#f0f0f0", borderBottomWidth: 1, borderColor: "#ccc" },
  backBtn: { padding: 10 },
  backText: { color: "#007AFF", fontWeight: "bold" },
});
