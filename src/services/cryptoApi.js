const API_URL = "https://indodax.com";
import { items } from "../data/items";

export const fetchCryptoData = async () => {
  try {
    const response = await fetch(`${API_URL}?/api/pairs`);
    const json = await response.json();
    return json.results || items;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};
