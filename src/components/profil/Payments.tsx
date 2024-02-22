import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Product } from "../../@types/product";
import { buyProduct } from "../../api/productAPI";
import { delay } from "lodash";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { NavigationKey } from "../../navigation/NavigationKey";

interface PaymentsProps {
  isVisible: boolean;
  onClose: () => void;
  totalPrice: number;
  products: Product[];
  onPaymentSubmit: () => void;
  removeFromCart: (userId: number, productId: number) => Promise<any>;
}

const Payments: React.FC<PaymentsProps> = ({
  isVisible,
  onClose,
  totalPrice,
  onPaymentSubmit,
  removeFromCart,
  products,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleCartPress = () => {
    console.log("changing to panelScreen");
    navigation.navigate(NavigationKey.PanelScreen as never);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePaymentDetailsSubmit = async () => {
    console.log("Payment method selected:", paymentMethod);

    onPaymentSubmit();
    Toast.show({
      type: "success",
      text1: "Removed",
      text2: "Thank for buying from us.",
      visibilityTime: 3000,
    });

    await handleRemoveToShoppingPanel();
    await handleAddingToBoughtProducts();

    onClose();
  };

  const handleRemoveToShoppingPanel = async () => {
    const userId = 1;

    try {
      // Remove all products from the cart
      await Promise.all(
        products.map(async (product) => {
          await removeFromCart(userId, product.id);
          console.log(`Product ${product.id} removed from cart successfully`);
        })
      );
    } catch (error) {
      // console.error("Error removing products from cart:", error);
    }
  };

  const handleAddingToBoughtProducts = async () => {
    const userId = 1;

    try {
      // Buy all products from the cart
      await Promise.all(
        products.map(async (product) => {
          await buyProduct(userId, product.id);
          console.log(`Product ${product.id} Bought successfully`);
        })
      );
    } catch (error) {
      console.error("Error buying products from cart:", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onClose} style={styles.shodowContainer}>
          <Icon name="chevron-left" color={colors.maincolor} size={25} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.description}>Pay for your products</Text>
        </View>
        <TouchableOpacity style={styles.shodowContainer2}></TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={onClose} style={styles.shodowContainer}>
          <Icon name="chevron-left" color={colors.maincolor} size={25} />
        </TouchableOpacity> */}
        <>
          <Text style={styles.title}>Select Payment Method</Text>
          {/* Display the total price in Payments */}
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>
              Total Price: ${totalPrice.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => handlePaymentMethodSelect("creditCard")}
          >
            <Icon name="credit-card" color={colors.breakcolor} size={25} />
            <Text style={styles.paymentText}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentMethodButton}
            onPress={() => handlePaymentMethodSelect("paypal")}
          >
            <Icon name="money" color={colors.breakcolor} size={25} />
            <Text style={styles.paymentText}>Cash at delivery</Text>
          </TouchableOpacity>

          {/* Display payment form if a method is selected */}
          {paymentMethod && (
            <View style={styles.paymentForm}>
              <Text style={styles.formTitle}>Enter Payment Details</Text>
              {/* Placeholder for payment form inputs */}
              <TextInput
                style={styles.formInput}
                placeholder="Card Number"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.formInput}
                placeholder="Expiration Date"
                keyboardType="numeric"
              />
              {/* Add more input fields as needed */}

              {/* Submit button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePaymentDetailsSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Close button */}
          {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </>
      </View>
      <Toast />
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    padding: 16,
  },
  container: {
    marginTop: 20,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.maincolor, // You can customize the text color
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: colors.maincolor, // You can customize the text color
  },
  shodowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 50,
    marginVertical: 10,
    zIndex: 2,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#FFF",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  shodowContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 50,
    marginVertical: 10,
    zIndex: 2,
    borderRadius: 10,
    padding: 5,
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 16,
  },
  paymentMethodButton: {
    width: "70%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    borderColor: colors.darkgray,
    marginBottom: 8,
  },
  paymentForm: {
    marginTop: 16,
    width: "80%",
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  formInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
  },
  submitButton: {
    backgroundColor: colors.maincolor,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
  totalPriceContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Payments;
