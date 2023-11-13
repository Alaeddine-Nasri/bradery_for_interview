import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";
import { Product } from "../../@types/product";
// import { Icon } from "react-native-vector-icons/Icon";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/sizes";

interface ProductDescriptionProps {
  product: Product;
  onClose: () => void;
  addToCart: (userId: number, productId: number) => Promise<any>;
  removeFromCart: (userId: number, productId: number) => Promise<any>;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  onClose,
  addToCart,
  removeFromCart,
}) => {
  const handleAddToShoppingPanel = async () => {
    // Assuming you have the user ID and product ID available
    const userId = 1; // Update this with the actual user ID
    const productId = product.id; // Assuming the product has an 'id' property

    try {
      // Call the addToCart function
      await addToCart(userId, productId);
      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const handleRemoveToShoppingPanel = async () => {
    // Assuming you have the user ID and product ID available
    const userId = 1; // Update this with the actual user ID
    const productId = product.id; // Assuming the product has an 'id' property

    try {
      // Call the addToCart function
      await removeFromCart(userId, productId);
      console.log("Product remove from cart successfully");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
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
      <View style={styles.rowBox}>
        <Text style={styles.modalTitle}>{product.name}</Text>
        <TouchableOpacity>
          <Icon name="heart-o" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowBox}>
        <Text style={styles.modalprice}>${product.price}</Text>
        <View style={styles.rowBoxWidth}>
          <TouchableOpacity onPress={handleRemoveToShoppingPanel}>
            <Icon name="minus-circle" color={colors.maincolor} size={25} />
          </TouchableOpacity>
          <Text style={styles.modalText}>1</Text>
          <TouchableOpacity onPress={handleAddToShoppingPanel}>
            <Icon name="plus-circle" color={colors.maincolor} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={(styles.rowBox, styles.colorsChoice)}>
        {product.colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.modalColor, { backgroundColor: color }]}
          ></TouchableOpacity>
        ))}
      </View>

      <Text style={styles.modalDecriptionTitle}>About the product</Text>
      <Text style={styles.modalText}>{product.description}</Text>
      {/* <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalColor: {
    borderRadius: 9999,
    backgroundColor: "red",
    height: 35,
    width: 35,
    marginRight: 15,
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  colorsChoice: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 10,
    // justifyContent: "flex-start",
  },
  rowBoxWidth: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "25%",
  },
  modalContent: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "80%",
    backgroundColor: colors.mainwhite,
    padding: 20,
    borderRadius: 10,
  },
  DescriptionImageContainer: {
    height: "50%", // Adjust as needed
  },
  DescriptionImage: {
    flex: 1,
    width: "90%",
    resizeMode: "contain",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333", // Adjust text color
    lineHeight: 24, // Adjust line height
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333", // Adjust text color
  },
  modalprice: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.maincolor,
  },
  modalDecriptionTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 2,
    color: "#333", // Adjust text color
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
