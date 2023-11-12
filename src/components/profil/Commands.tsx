import React from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ProductBox from "../home/ProductBox";
import { Product, User } from "../../@types/product";

interface CommandsProps {
  user: User;
}

const Commands: React.FC<CommandsProps> = ({ user }) => {
  const renderRows = () => {
    if (user.boughtItems.length === 0) {
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

    return user.boughtItems
      .slice(0, 2)
      .map((product: Product) => (
        <ProductBox key={product.id.toString()} product={product} />
      ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bought Items</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
