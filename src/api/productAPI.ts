import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";

export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/product", {
      method: "GET",
    });

    if (!response.ok) {
      // Handle non-successful response here
      const errorMessage = `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }
    // const response = await axios.get(`${BASE_URL}/product`);
    // console.log(response);
    // return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // rethrow the error for the component to handle
  }
};
