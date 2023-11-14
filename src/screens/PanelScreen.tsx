import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as StatusB,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { fetchCartProducts, removeFromCart } from "../api/productAPI";
import { Product } from "../@types/product";
import Payments from "../components/profil/Payments";
import FavoriteHeader from "../components/favorite/FavoriteHeader";
import Panel from "../components/profil/Panel";

const PanelScreen: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const products = await fetchCartProducts(1);
      setCartProducts(products);

      const total = products.reduce(
        (acc: number, product: { price: string }) =>
          acc + parseFloat(product.price),
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error("Error fetching bought products:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handlePayOrders = () => {
    setPaymentModalVisible(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalVisible(false);
  };

  const handlePaymentSubmit = () => {
    setPaymentModalVisible(false);
  };

  const handlePaymentSuccess = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error("Error fetching updated cart products:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: 4,
          paddingTop: Platform.OS === "android" ? StatusB.currentHeight : 0,
        }}
      >
        <FavoriteHeader title="Cart Picks" description="Buy your items now" />
        <Panel products={cartProducts} />

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>
            Total Price: ${totalPrice.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayOrders}>
          <Text style={styles.payButtonText}>Pay for Your Orders</Text>
        </TouchableOpacity>

        <Payments
          isVisible={isPaymentModalVisible}
          onClose={handleClosePaymentModal}
          totalPrice={totalPrice}
          onPaymentSubmit={handlePaymentSubmit}
          onPaymentSuccess={handlePaymentSuccess}
          removeFromCart={removeFromCart}
          products={cartProducts}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  totalPriceContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "blue",
    padding: 16,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PanelScreen;
