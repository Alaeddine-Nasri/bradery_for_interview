import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ProductBox from "../home/ProductBox";
import { Product, User } from "../../@types/product";

interface PanelProps {
  user: User;
}

const Panel: React.FC<PanelProps> = ({ user }) => {
  const renderRows = () => {
    if (user.shoppingCart.length === 0) {
      return (
        <View style={styles.noItemsContainer}>
          <Image
            source={require("../../../assets/images/sad.png")} // Adjust the path to your image
            style={styles.sadImage}
          />
          <Text style={styles.noItemsText}>You haven't shopped any items.</Text>
        </View>
      );
    }

    return user.shoppingCart.map((item: Product) => (
      <ProductBox key={item.id.toString()} product={item} />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Panel</Text>
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
