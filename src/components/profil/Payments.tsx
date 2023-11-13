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

interface PaymentsProps {
  isVisible: boolean;
  onClose: () => void;
  totalPrice: number;
  products: Product[];
  onPaymentSubmit: () => void;

  removeFromCart: (userId: number, productId: number) => Promise<any>;
  onPaymentSuccess: () => void;
}

const Payments: React.FC<PaymentsProps> = ({
  isVisible,
  onClose,
  totalPrice,
  onPaymentSubmit,
  removeFromCart,
  products,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePaymentDetailsSubmit = () => {
    console.log("Payment method selected:", paymentMethod);
    // Call the callback function from the parent component
    onPaymentSubmit();
    handleAddingToBoughtProducts();
    handleRemoveToShoppingPanel();
    // Close the modal after submission
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
      console.error("Error removing products from cart:", error);
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
      onPaymentSuccess();
    } catch (error) {
      console.error("Error buying products from cart:", error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
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
          <Text>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethodButton}
          onPress={() => handlePaymentMethodSelect("paypal")}
        >
          <Text>PayPal</Text>
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
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  paymentMethodButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 8,
  },
  paymentForm: {
    marginTop: 16,
    width: "80%",
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
    backgroundColor: "blue",
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
