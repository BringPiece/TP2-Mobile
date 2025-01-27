import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importing Icon library
import { fetchDataProducts } from "../services/products";
import { items } from "../data/items";

export default function ListScreen({ navigation, cart, addToCart }) {
  const [productsEcom, setProductsEcom] = useState(items);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await fetchDataProducts();
      const shuffledProducts = shuffleArray(result);
      setProductsEcom(shuffledProducts);
    } catch (error) {
      console.error("Error fetching ecommerce data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleEcomPress = (ecommerce) => {
    navigation.navigate("DetailScreen", { ecommerce });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#A88905"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cart Icon and Text */}
      <View style={styles.cartContainer}>
        <Icon
          name="cart"
          size={24}
          color="#A88905"
        />
        <Text style={styles.cartText}>Cart: {cart.length} items</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={productsEcom}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ecomItem}
            onPress={() => handleEcomPress(item)}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F5EB", // Soft beige background
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F5EB",
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FDF6E3", // Slightly darker beige for contrast
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartText: {
    fontSize: 16,
    color: "#A88905", // Gold for a luxurious feel
    marginLeft: 10,
    fontWeight: "600",
  },
  ecomItem: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF", // Crisp white for product cards
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2C2C2C", // Deep gray for readability
    textAlign: "center",
  },
});
