import axios from "axios";
import { Product, User } from "../@types/product";

const BASE_URL = "https://c6e2-46-193-1-137.ngrok-free.app/api";

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
export const listproductsPromotion = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product/promotion`);
    const promoProducts = response.data;
    console.log("Promotional Products are: ", promoProducts);
    return promoProducts;
  } catch (error) {
    console.error("Error fetching promotional products:", error);
    throw error;
  }
};

export const fetchProductsByType = async (type: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${type}`);
    const filteredProducts = response.data;
    console.log(`Products filtered by type (${type}) are:`, filteredProducts);
    return filteredProducts;
  } catch (error) {
    console.error(`Error fetching products by type (${type}):`, error);
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
    // console.error("Error removing product from cart:", error);
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

export const fetchFavItems = async (userId: number): Promise<Product[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/favoriteItems/${userId}`
    );
    const favItems: Product[] = response.data;
    console.log("Favorite items are:", favItems);
    return favItems;
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    throw error;
  }
};

export const checkIfFavorite = async (userId: number, productId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/checkFavorite/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking if product is a favorite:", error);
    throw error;
  }
};

export const addToFavorites = async (userId: number, productId: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addToFavorites/${userId}/${productId}`
    );
    console.log("data?", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    throw error;
  }
};

export const removeFromFavorite = async (userId: number, productId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/user/removeFromFavorites/${userId}/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing product from favorite:", error);
    throw error;
  }
};
