export type RootStackParamList = {
  Home: undefined;
  ProductDescription: { product: Product };
};

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  favoriteItems: Product[];
  shoppingCart: Product[];
  boughtItems: Product[];
  deliveryAddress: string;
  photo: string;
}
export interface UserProduct {
  userId: number;
  productId: number;
  type: "cart" | "boughtItems"; // You can adjust the types based on your requirements
}

export type Product = {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: string;
  colors: string[];
};
