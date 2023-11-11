export type RootStackParamList = {
  Home: undefined;
  ProductDescription: { product: Product };
};

export type Product = {
  images: string[];
  name: string;
  description: string;
  price: number;
};
