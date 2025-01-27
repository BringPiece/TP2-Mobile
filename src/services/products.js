const API_URL = "https://fakestoreapi.com";
import { items } from "../data/items";

export const fetchDataProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const json = await response.json();
    return json.results || items;
  } catch (error) {
    console.error("Error fetching ecommerce data:", error);
    return [];
  }
};
