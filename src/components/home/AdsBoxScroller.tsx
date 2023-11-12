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

type AdsBoxProps = {
  products: Product[];
};

const AdsBox: React.FC<AdsBoxProps> = ({ products }) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef<number>(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const toggleModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({ item }: { item: Product; index: number }) => (
    <TouchableOpacity onPress={() => toggleModal(item)}>
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
    <View style={styles.AdsContainer}>
      <FlatList
        style={styles.sliderContainer}
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
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  AdsContainer: {
    flex: 0.35,
  },
  sliderContainer: {
    flex: 0.3,
    margin: 0,
  },
  modalC: {
    margin: 0,
    width: "100%",
  },
  AdsBoxContainer: {
    alignItems: "center",
    flex: 0.8,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
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
  PromoText: {
    color: "grey",
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
