import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Product } from "../../@types/product";

type AdsBoxProps = {
  products: Product[];
};

const AdsBox: React.FC<AdsBoxProps> = ({ products }) => {
  return (
    <View style={styles.AdsBoxContainer}>
      <View style={styles.AdPhotoContainer}>
        <Image
          source={require("../../../assets/icons/drop.png")}
          style={styles.AdPhoto}
        />
      </View>
      <View style={styles.AdsBoxPromoContainer}>
        <Text style={styles.PromoText}>{products[0].name}</Text>
        <Text style={styles.PromoText}>Promo</Text>
        <Text style={styles.PromoText}>{products[0].price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AdsBoxContainer: {
    alignItems: "center",
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
  },
  AdPhotoContainer: {
    flex: 2 / 5,
  },
  AdsBoxPromoContainer: {
    marginHorizontal: 10,
    flex: 3 / 5,
    flexDirection: "column",
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

export default AdsBox;
