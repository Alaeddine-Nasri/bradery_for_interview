import axios from "axios";
import { Product, User } from "../@types/product";

const BASE_URL = "https://4079-46-193-1-137.ngrok-free.app/api";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    const products = response.data;
    console.log("Products are : ", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    const user: User = response.data;
    console.log("User is:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
export const addToCart = async (userId: number, productId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addToCart/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (userId: number, productId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/user/removeFromCart/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export const buyProduct = async (userId: number, productId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/buyProduct/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error buying product:", error);
    throw error;
  }
};

export const fetchBoughtProducts = async (userId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/boughtProducts/${userId}`
    );
    const boughtProducts = response.data;
    console.log("Bought products are:", boughtProducts);
    return boughtProducts;
  } catch (error) {
    console.error("Error fetching bought products:", error);
    throw error;
  }
};

export const fetchCartProducts = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/cartProducts/${userId}`);
    const cartProducts = response.data;
    console.log("Cart products are:", cartProducts);
    return cartProducts;
  } catch (error) {
    console.error("Error fetching cart products:", error);
    throw error;
  }
};
