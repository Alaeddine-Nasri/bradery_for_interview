import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { User, Product } from "../../@types/product";
import FavProductItem from "../favorite/FavProductItem";
import { fetchBoughtProducts, fetchCartProducts } from "../../api/productAPI";
import { colors } from "../../theme/colors";

interface PanelProps {
  // user?: User;
  products: Product[];
  // userId: number;
}

const Panel: React.FC<PanelProps> = ({ products }) => {
  // const [cartProducts, setCartProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const products = await fetchCartProducts(userId);
  //       setCartProducts(products);
  //     } catch (error) {
  //       console.error("Error fetching cartProducts:", error);
  //       // Handle error as needed
  //     }
  //   };

  //   fetchData();
  // }, [userId]);

  if (!products || products.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Image
          source={require("../../../assets/images/sad.png")}
          style={styles.sadImage}
        />
        <Text style={styles.noItemsText}>You haven't bought any items.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>See More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {products.map((item: Product) => (
          <FavProductItem key={item.id.toString()} product={item} />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    color: colors.maincolor,
    fontWeight: "600",
    fontSize: 20,
  },
  viewMore: {
    color: colors.breakcolor,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  viewAllButton: {
    padding: 8,
  },
  viewAllText: {
    color: "blue",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 10,
  },
  sadImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default Panel;
