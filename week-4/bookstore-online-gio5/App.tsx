// GIỜ 5 — Tổng hợp: Bottom Tab Layout & Hoàn thiện ứng dụng
// Bài 1: TabBar 4 mục cố định đáy (position: 'absolute').
// Bài 2: CartScreen đủ 3 vùng (cuộn / tổng tiền cố định / tab bar cố định).
// Tích hợp: tab "Trang chủ" -> HomeScreen (Giờ 4 Bài 1),
//           tab "Danh mục"  -> CategoryScreen (Giờ 2),
//           tab "Giỏ hàng"  -> CartScreen (Giờ 5 Bài 2),
//           tab "Tài khoản" -> placeholder đơn giản.
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TabBar, TabKey } from './components/TabBar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CategoryScreen } from './screens/CategoryScreen';
import { CartScreen } from './screens/CartScreen';
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(CART_ITEMS.length);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  function renderContent() {
    // Khi đang xem chi tiết sách (từ tab Trang chủ), hiện BookDetailScreen
    if (activeTab === 'home' && selectedBook) {
      return (
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => setCartCount((n) => n + 1)}
        />
      );
    }
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab('cart')}
          />
        );
      case 'category':
        return <CategoryScreen />;
      case 'cart':
        return <CartScreen items={CART_ITEMS} />;
      case 'account':
        return <AccountPlaceholder />;
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* flex:1 -> containing block cho TabBar (position:'absolute') bên dưới */}
      <View style={styles.body}>
        {renderContent()}
        <TabBar active={activeTab} onChange={(key) => { setSelectedBookId(null); setActiveTab(key); }} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function AccountPlaceholder() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderIcon}>👤</Text>
      <Text style={styles.placeholderText}>Tài khoản</Text>
      <Text style={styles.placeholderSub}>Chức năng đang phát triển</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderIcon: { fontSize: 48, marginBottom: 12 },
  placeholderText: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 },
  placeholderSub: { fontSize: 14, color: '#5B6B7F' },
});
