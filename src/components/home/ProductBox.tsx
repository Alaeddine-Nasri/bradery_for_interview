import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Product } from "../../@types/product";

type ProductBoxProps = {
  product: Product;
};

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  return (
    <View style={styles.ProductBoxContainer}>
      <View style={styles.AdPhotoContainer}>
        <Image
          source={{ uri: product.image }}
          // source={require("../../../assets/images/1.png")}
          style={styles.AdPhoto}
        />
      </View>
      <View style={styles.AdsBoxPromoContainer}>
        <Text style={styles.PromoText}>{product.name}</Text>
        {/* <Text style={styles.PromoText}>Promo</Text> */}
        <Text style={styles.PromoText}>{product.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ProductBoxContainer: {
    alignItems: "center",
    flexBasis: "48%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 8,
    marginVertical: 5,
  },
  AdPhotoContainer: {
    flex: 3 / 5,
  },
  AdsBoxPromoContainer: {
    marginHorizontal: 10,
    width: "100%",
    flex: 2 / 5,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "red",
    marginTop: 5,
  },
  AdPhoto: {
    width: 85,
    height: 85,
  },
  PromoText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ProductBox;
