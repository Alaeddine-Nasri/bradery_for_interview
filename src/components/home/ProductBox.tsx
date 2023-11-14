import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Product } from "../../@types/product";
import ProductDescription from "./ProductDescription";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/colors";
import {
  addToCart,
  addToFavorites,
  removeFromCart,
  removeFromFavorite,
  checkIfFavorite,
} from "../../api/productAPI";

type ProductBoxProps = {
  product: Product;
};

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFavoritePress = async () => {
    const userId = 1;
    console.log("handleFavoritePress");
    try {
      if (isFavorite) {
        console.log("handleFavoritePressf");
        await removeFromFavorite(userId, product.id);
      } else {
        console.log("handleFavoritePressn");
        await addToFavorites(userId, product.id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.cardStyle}
      onPress={toggleModal}
      activeOpacity={0.8}
    >
      <View style={styles.productCard}>
        <View style={styles.cardImageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.cardImage} />
        </View>
        <View style={styles.rowBox}>
          <View style={styles.cardDetails}>
            <Text style={styles.stockText}>{product.stock} in stock</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleFavoritePress}>
              <Icon
                name={isFavorite ? "heart" : "heart-o"}
                size={25}
                color={isFavorite ? "red" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal for displaying more details */}
      <Modal
        style={styles.modalC}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
      >
        <ProductDescription
          product={product}
          onClose={toggleModal}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          addToFavorites={addToFavorites}
          removeFromFavorite={removeFromFavorite}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    // marginBottom: 10,
  },
  cardStyle: {
    width: "48%",
  },
  modalC: {
    margin: 0,
    width: "100%",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 8,
    overflow: "hidden",
  },
  cardImageContainer: {
    height: 130,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  cardDetails: {
    padding: 10,
  },
  stockText: {
    fontSize: 13,
    // fontWeight: "bold",
    color: "green",
    marginBottom: 2,
  },
  productName: {
    color: colors.maincolor,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },

  productPrice: {
    fontSize: 14,
    color: colors.breakcolor,
  },
});

export default ProductBox;
