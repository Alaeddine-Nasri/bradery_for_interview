import { User } from "./product";
import { productsStat } from "./products";

// Creating a user instance

export const users: User[] = [
  {
    id: 0,
    name: "Ala Eddine",
    email: "ia_nasri@esi.com",
    phoneNumber: "+33744479999",
    favoriteItems: [productsStat[2], productsStat[0]],
    shoppingCart: [productsStat[2], productsStat[0]],
    boughtItems: [],
    // boughtItems: [productsStat[2], productsStat[0], productsStat[1]],
    deliveryAddress: "13, Rue de chanzy Nanterre, 92000 France",
    photo: require("../../assets/images/profil.jpg"),
  },
];
