import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Product } from "../../@types/product";
import ProductBox from "./ProductBox";

type ProductBoxProps = {
  products: Product[];
};

const ProductBoxContainer: React.FC<ProductBoxProps> = ({ products }) => {
  return (
    <View style={styles.Container}>
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

      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.ProductBoxContainer}
      >
        {/* <View style={styles.ProductBoxContainer2}> */}
        {products.map((product, index) => (
          <ProductBox key={index} product={product} />
        ))}
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,

    // You can set a specific height if needed
    // height: 300,
  },
  ProductBoxContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    backgroundColor: "blue",
    paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  ProductBoxContainer2: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    backgroundColor: "purple",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  ProductFilters: {
    padding: 10,
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
