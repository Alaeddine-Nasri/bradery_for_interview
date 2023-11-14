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
  type: "cart" | "boughtItems" | "favoriteItems";
}

export type Product = {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: string;
  colors: string[];
  stock: number;
  promotion: boolean;
  newPrice: string;
  bestMatch: boolean;
  newArrival: boolean;
  trendy: boolean;
};
