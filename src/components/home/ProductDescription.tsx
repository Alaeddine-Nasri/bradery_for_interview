import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";
import { Product } from "../../@types/product";

interface ProductDescriptionProps {
  product: Product;
  onClose: () => void;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  onClose,
}) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.DescriptionImageContainer}>
        <Swiper showsButtons={false} loop={false}>
          {product.images.map((imageUrl, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.DescriptionImage}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <Text style={styles.modalText}>{product.name}</Text>
      <Text style={styles.modalText}>{`$${product.price.toFixed(2)}`}</Text>
      <Text style={styles.modalText}>{product.description}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  DescriptionImageContainer: {
    height: "50%", // Adjust as needed
  },
  DescriptionImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDescription;
