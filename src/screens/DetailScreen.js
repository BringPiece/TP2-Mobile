import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share } from "react-native";
import HTML from "react-native-render-html";

export default function DetailScreen({ route, addToCart, cart }) {
  const { crypto } = route.params; // crypto object passed from the previous screen
  const [isAdded, setIsAdded] = useState(false);

  // Check if the item is already in the cart
  const isCryptoInCart = cart.some((item) => item.id === crypto.id);

  // Handle Share functionality
  const handleShare = async () => {
    try {
      const cleanDescription = crypto.description.replace(/<\/?[^>]+(>|$)/g, "");
      const message = `
      🍴 *Check out this delicious crypto!* 🍴

      ✨ *Name*: ${crypto.symbol}
      📝 *Description*: ${cleanDescription}
      💰 *Price*: $${crypto.price_precision}
      📸 *Image*: ${crypto.url_logo_png}
          `.trim();

      await Share.share({
        message,
        url: crypto.url_logo_png, // Some platforms (like WhatsApp on mobile) might use this as a media preview.
      });
    } catch (error) {
      console.error("Error sharing", error.message);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!isCryptoInCart) {
      addToCart(crypto); // Add the crypto to the cart
      setIsAdded(true); // Mark it as added
    } else {
      console.log("Item is already in the cart");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: crypto.image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{crypto.title}</Text>
        <HTML
          source={{ html: crypto.description }}
          contentWidth={300}
        />
        <Text style={styles.price}>Price: ${crypto.price}</Text>

        <TouchableOpacity
          style={[styles.button, isCryptoInCart && styles.buttonAdded]}
          onPress={handleAddToCart}>
          <Text style={styles.buttonText}>{isCryptoInCart ? "Item Already in Cart" : "Add to Cart"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleShare}>
          <Text style={styles.buttonText}>Share Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#FF7043",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonAdded: {
    backgroundColor: "#FF7043", // Red color when item is already in cart
  },
  secondaryButton: {
    backgroundColor: "#FF7043", // Secondary button color
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
