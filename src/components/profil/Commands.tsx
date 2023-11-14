import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ProductBox from "../home/ProductBox";
import { Product, User } from "../../@types/product";
import { fetchBoughtProducts } from "../../api/productAPI";
import { colors } from "../../theme/colors";

interface CommandsProps {
  // user?: User;
  userId: number;
}

const Commands: React.FC<CommandsProps> = ({ userId }) => {
  const [boughtProducts, setBoughtProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchBoughtProducts(userId);
        setBoughtProducts(products);
      } catch (error) {
        console.error("Error fetching bought products:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [userId]);

  const renderRows = () => {
    if (!boughtProducts || boughtProducts.length === 0) {
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
    // if (!user || !user.boughtItems) {
    if (!boughtProducts) {
      return (
        <View style={styles.noItemsContainer}>
          <Image
            source={require("../../../assets/images/sad.png")} // Provide the correct path to your image
            style={styles.sadImage}
          />
          <Text style={styles.noItemsText}>You haven't bought any items.</Text>
        </View>
      );
    }

    // if (user.boughtItems.length === 0) {
    if (boughtProducts.length === 0) {
      return (
        <View style={styles.noItemsContainer}>
          <Image
            source={require("../../../assets/images/sad.png")} // Provide the correct path to your image
            style={styles.sadImage}
          />
          <Text style={styles.noItemsText}>You haven't bought any items.</Text>
        </View>
      );
    }

    return boughtProducts
      .slice(0, 2)
      .map((product: Product) => (
        <ProductBox key={product.id.toString()} product={product} />
      ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bought Products</Text>
        <TouchableOpacity disabled>
          <Text style={styles.viewMore}>See More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>{renderRows()}</View>
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
    color: colors.darkgray,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  viewAllButton: {
    padding: 8,
  },
  viewAllText: {
    color: "blue", // You can customize the color
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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

export default Commands;
