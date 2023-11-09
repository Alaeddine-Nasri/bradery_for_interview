import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../../@types/product";
import ProductBox from "./ProductBox";

type ProductBoxProps = {
  products: Product[];
};

const ProductBoxContainer: React.FC<ProductBoxProps> = ({ products }) => {
  return (
    <View>
      <View style={styles.ProductFilters}>
        <TouchableOpacity>
          <Text style={styles.filtreItem}>Best Match</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filtreItem}>New Arrival</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filtreItem}>Trendy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.filtreItem}>Promotion</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ProductBoxContainer}>
        {products.map((product, index) => (
          <ProductBox key={index} product={product} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductBoxContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    // padding: 15,
    // borderRadius: 8,
    // marginVertical: 5,
  },
  ProductFilters: {
    padding: 10,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  filtreItem: {
    fontWeight: "500",
    fontSize: 15,
  },
});

export default ProductBoxContainer;
