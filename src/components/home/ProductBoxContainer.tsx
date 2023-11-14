// ProductBoxContainer.tsx
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ProductBox from "./ProductBox"; // Import the new component
import { Product } from "../../@types/product";

interface ProductBoxContainerProps {
  products: Product[];
}

const ProductBoxContainer: React.FC<ProductBoxContainerProps> = ({
  products,
}) => {
  // Function to create wrapped rows of products
  const renderRows = () => {
    const productsPerRow = 2; // Adjust the number of products per row as needed
    const rows: JSX.Element[] = [];

    for (let i = 0; i < products.length; i += productsPerRow) {
      const rowProducts = products
        .slice(i, i + productsPerRow)
        .map((product) => <ProductBox key={product.name} product={product} />);

      rows.push(
        <View style={styles.row} key={i}>
          {rowProducts}
        </View>
      );
    }

    return rows;
  };

  return <ScrollView style={styles.container}>{renderRows()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    // padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 5,
  },
});

export default ProductBoxContainer;
