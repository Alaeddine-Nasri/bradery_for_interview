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

export type Product = {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: string;
  colors: string[];
};
