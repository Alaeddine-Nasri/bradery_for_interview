import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Product } from "../../@types/product";
import ProductDescription from "./ProductDescription";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  addToCart,
  addToFavorites,
  removeFromCart,
  removeFromFavorite,
  checkIfFavorite,
} from "../../api/productAPI";
import { colors } from "../../theme/colors";

type AdsBoxProps = {
  products: Product[];
};

const AdsBox: React.FC<AdsBoxProps> = ({ products }) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef<number>(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % products.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndexRef.current,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  const toggleModal = async (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(!isModalVisible);

    // Fetch favorite status when the modal is opened
    try {
      const userId = 1; // Replace with the actual user ID
      const result = await checkIfFavorite(userId, product.id);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error("Error fetching favorite status:", error);
    }
  };

  const handleFavoritePress = async () => {
    const userId = 1; // Replace with the actual user ID
    try {
      if (isFavorite) {
        await removeFromFavorite(userId, selectedProduct?.id || 0);
      } else {
        await addToFavorites(userId, selectedProduct?.id || 0);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const renderItem = ({ item }: { item: Product; index: number }) => (
    <TouchableOpacity
      onPress={() => toggleModal(item)}
      style={styles.sliderContainer}
    >
      <View style={styles.slide}>
        <View style={styles.AdsBoxContainer}>
          <View style={styles.AdPhotoContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.AdPhoto} />
          </View>
          <View style={styles.AdsBoxPromoContainer}>
            <Text style={styles.PromoText}>{item.name}</Text>
            <Text style={styles.PromoText}>Promo</Text>
            <Text style={styles.PromoText}>{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Promotions</Text>
        <Text style={styles.viewMore}>See More</Text>
      </View>
      <View style={styles.AdsContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={products}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / Dimensions.get("window").width
            );
            currentIndexRef.current = index;
          }}
        />

        {/* Modal for displaying more details */}
        <Modal
          style={styles.modalC}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          {selectedProduct && (
            <ProductDescription
              product={selectedProduct}
              onClose={() => setModalVisible(false)}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              addToFavorites={addToFavorites}
              removeFromFavorite={removeFromFavorite}
            />
          )}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AdsContainer: {
    flex: 0.35,
    // marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalC: {
    margin: 0,
    width: "100%",
  },
  AdsBoxContainer: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  favoriteIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  AdPhotoContainer: {
    flex: 0.4,
  },
  AdsBoxPromoContainer: {
    marginHorizontal: 10,
    flex: 0.6,
    flexDirection: "column",
  },
  AdPhoto: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  title: {
    color: colors.mainblack,
    fontWeight: "600",
    fontSize: 20,
  },
  viewMore: {
    color: colors.breakcolor,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  PromoText: {
    color: colors.darkgray,
    fontWeight: "600",
    fontSize: 16,
  },
  slide: {
    width: Dimensions.get("window").width - 7,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdsBox;
