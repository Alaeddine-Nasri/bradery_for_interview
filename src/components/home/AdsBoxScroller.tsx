import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useRef, useEffect } from "react";

import { Product } from "../../@types/product";

type AdsBoxProps = {
  products: Product[];
};

const AdsBox: React.FC<AdsBoxProps> = ({ products }) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Automatically scroll to the next image
      currentIndexRef.current = (currentIndexRef.current + 1) % products.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndexRef.current,
        animated: true,
      });
    }, 3000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [products]);
  const renderItem = ({ item }: { item: Product; index: number }) => (
    // <View style={styles.slide}>
    //   <Image source={{ uri: item.image }} style={styles.image} />
    //   <Text style={styles.text}>{item.name}</Text>
    // </View>
    <View style={styles.slide}>
      <View style={styles.AdsBoxContainer}>
        <View style={styles.AdPhotoContainer}>
          <Image source={{ uri: item.image }} style={styles.AdPhoto} />
        </View>
        <View style={styles.AdsBoxPromoContainer}>
          <Text style={styles.PromoText}>{item.name}</Text>
          <Text style={styles.PromoText}>Promo</Text>
          <Text style={styles.PromoText}>{item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.sliderContainer}
      ref={flatListRef}
      horizontal
      data={[products[1], products[0], products[2]]}
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
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    backgroundColor: "red",
    margin: 0,
  },
  AdsBoxContainer: {
    // height: "60%",
    alignItems: "center",
    flex: 0,
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
    color: "grey",
    fontWeight: "600",
    fontSize: 16,
  },

  slide: {
    // width: "100%",
    width: Dimensions.get("window").width - 7,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});

export default AdsBox;
