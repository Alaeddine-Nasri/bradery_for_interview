// import React, { useState } from "react";
// import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Modal from "react-native-modal";
// import { Product } from "../../@types/product";

// type ProductBoxProps = {
//   product: Product;
// };

// const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   return (
//     <View style={styles.ProductBoxContainer}>
//       <TouchableOpacity onPress={toggleModal}>
//         <View style={styles.AdPhotoContainer}>
//           <Image source={{ uri: product.image }} style={styles.AdPhoto} />
//         </View>
//         <View style={styles.AdsBoxPromoContainer}>
//           <Text style={styles.PromoText}>{product.name}</Text>
//           <Text style={styles.PromoText}>{product.price}</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Modal for displaying more details */}
//       <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalText}>{product.name}</Text>
//           <Text style={styles.modalText}>{`$${product.price.toFixed(2)}`}</Text>
//           <TouchableOpacity onPress={toggleModal}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   ProductBoxContainer: {
//     height: "50%",
//     width: "50%",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     backgroundColor: "white",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 3,
//     borderRadius: 8,
//     marginVertical: 5,
//   },
//   AdPhotoContainer: {
//     alignItems: "center",
//     flex: 0.6,
//     width: "100%",
//   },
//   AdsBoxPromoContainer: {
//     marginHorizontal: 10,
//     width: "100%",
//     flex: 0.4,
//     flexDirection: "column",
//     alignItems: "flex-start",
//     backgroundColor: "#FFF",
//     marginTop: 5,
//   },
//   AdPhoto: {
//     width: 85,
//     height: 85,
//   },
//   PromoText: {
//     color: "black",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: "blue",
//     marginTop: 10,
//   },
// });

// export default ProductBox;

import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Product } from "../../@types/product";
import ProductDescription from "./ProductDescription";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/sizes";

type ProductBoxProps = {
  product: Product;
};

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Icon name="heart-o" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal for displaying more details */}
      {/* Modal for displaying more details */}
      <Modal
        style={styles.modalC}
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
      >
        <ProductDescription product={product} onClose={toggleModal} />
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
    width: "50%",
  },
  modalC: {
    margin: 0,
    width: "100%",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    margin: 10,
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
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: colors.breakcolor,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
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
});

export default ProductBox;
