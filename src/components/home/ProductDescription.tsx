import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Swiper from "react-native-swiper";
import { Product } from "../../@types/product";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/colors";
import { checkIfFavorite } from "../../api/productAPI";
import Toast from "react-native-toast-message";

interface ProductDescriptionProps {
  product: Product;
  onClose: () => void;
  addToCart: (userId: number, productId: number) => Promise<any>;
  removeFromCart: (userId: number, productId: number) => Promise<any>;
  addToFavorites: (userId: number, productId: number) => Promise<any>;
  removeFromFavorite: (userId: number, productId: number) => Promise<any>;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  product,
  onClose,
  addToCart,
  removeFromCart,
  addToFavorites,
  removeFromFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const userId = 1; // Replace with the actual user ID
        const result = await checkIfFavorite(userId, product.id);
        setIsFavorite(result.isFavorite);
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };

    fetchFavoriteStatus();
  }, [product.id]);

  const handleFavoritePress = async () => {
    const userId = 1;
    const productId = product.id;
    console.log("handleFavoritePress");
    try {
      if (isFavorite) {
        console.log("handleFavoritePressf");
        await removeFromFavorite(userId, product.id);
      } else {
        console.log("handleFavoritePressn");
        await addToFavorites(userId, productId);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleAddToShoppingPanel = async () => {
    const userId = 1;
    const productId = product.id;

    try {
      // Call the addToCart function
      await addToCart(userId, productId);
      setCounter(counter + 1);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product Added to Panel 👋",
        visibilityTime: 3000,
      });
      console.log("Product added to cart successfully");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Eroor",
        text2: "Sorry you can't buy more than 1 item from this product",
        visibilityTime: 3000,
      });
      console.error("Error adding product to cart:", error);
    }
  };

  const handleRemoveToShoppingPanel = async () => {
    const userId = 1;
    const productId = product.id;

    try {
      // Call the addToCart function
      await removeFromCart(userId, productId);
      setCounter(counter > 0 ? counter - 1 : 0);
      Toast.show({
        type: "success",
        text1: "Removed",
        text2: "Product Removed From Panel 😔",
        visibilityTime: 3000,
      });
      console.log("Product removed from cart successfully");
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
        <View>
          <Text style={styles.modalTitle}>{product.name}</Text>
          <Text style={styles.modalStock}>
            {product.stock} available in stock
          </Text>
        </View>
        <TouchableOpacity onPress={handleFavoritePress}>
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={25}
            color={isFavorite ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowBox}>
        <Text style={styles.modalprice}>${product.price}</Text>
        <View style={styles.rowBoxWidth}>
          <TouchableOpacity onPress={handleRemoveToShoppingPanel}>
            <Icon name="minus-circle" color={colors.breakcolor} size={25} />
          </TouchableOpacity>
          <Text style={styles.modalText}>{counter}</Text>
          <TouchableOpacity onPress={handleAddToShoppingPanel}>
            <Icon name="plus-circle" color={colors.breakcolor} size={25} />
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
      <Text style={styles.modalTextDescription}>{product.description}</Text>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  modalColor: {
    borderRadius: 9999,
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
    marginBottom: 10,
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
    borderRadius: 25,
  },
  DescriptionImageContainer: {
    height: "45%",
  },
  DescriptionImage: {
    flex: 1,
    width: "90%",
    resizeMode: "contain",
  },
  modalStock: {
    fontSize: 16,
    marginBottom: 5,
    color: "green",
  },
  modalTextDescription: {
    fontSize: 18,
    color: colors.darkgray,
    lineHeight: 24,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "600",
    color: colors.maincolor,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: colors.maincolor,
  },
  modalprice: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 5,
    color: colors.maincolor,
  },
  modalDecriptionTitle: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 2,
    color: colors.maincolor,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDescription;
