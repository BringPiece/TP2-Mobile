import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import { fetchCryptoData } from "../services/cryptoApi";

export default function ListScreen({ navigation, cart, addToCart }) {
  const [cryptos, setCryptos] = useState(items);
  const [loading, setLoading] = useState(true);

  // Fetch crypto data from Spoonacular API
  const fetchData = async () => {
    try {
      const result = fetchCryptoData();

      setCryptos(result);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call the fetch function when the component mounts
  }, []);

  const handleCryptoPress = (crypto) => {
    navigation.navigate("DetailScreen", { crypto });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#FF7043"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cartText}>Cart: {cart.length} items</Text>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cryptoItem}
            onPress={() => handleCryptoPress(item)}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.symbol}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
  },
  cartText: {
    fontSize: 16,
    color: "#FF7043",
    marginBottom: 20,
  },
  cryptoItem: {
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#424242",
  },
});
