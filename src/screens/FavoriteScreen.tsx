import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar as StatusB,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import FavoriteHeader from "../components/favorite/FavoriteHeader";
import Panel from "../components/profil/Panel";
import { fetchFavItems } from "../api/productAPI";
import { Product, User } from "../@types/product";

export const FavoriteScreen: React.FC = () => {
  const [FavProducts, setFavProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const products = await fetchFavItems(1);
      setFavProducts(products);
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
        <FavoriteHeader
          title="Favorite Items"
          description="Your most loved items"
        />
        <Panel products={FavProducts} />
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
});
