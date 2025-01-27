import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Share } from "react-native";
import HTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DetailScreen({ route, addToCart, cart }) {
  const { ecommerce } = route.params; // ecommerce object passed from the previous screen
  // Check if the item is already in the cart
  const isProductInCart = cart.some((item) => item.id === ecommerce.id);

  // Handle Share functionality
  const handleShare = async () => {
    try {
      const cleanDescription = ecommerce.description.replace(/<\/?[^>]+(>|$)/g, "");
      const message = `
      🛍️ *Check out this amazing product!* 🛍️

      ✨ *Name*: ${ecommerce.title}
      📝 *Description*: ${cleanDescription}
      💵 *Price*: $${ecommerce.price}
      📸 *Image Preview*: ${ecommerce.image}
          `.trim();

      await Share.share({
        message,
        url: ecommerce.image,
      });
    } catch (error) {
      console.error("Error sharing", error.message);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!isProductInCart) {
      addToCart(ecommerce); // Add the ecommerce to the cart
    } else {
      console.log("Item is already in the cart");
    }
  };

  // Rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.ratingStars}>
        {Array(fullStars).fill().map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={20} color="#FFD700" />
        ))}
        {halfStar === 1 && <Icon name="star-half-o" size={20} color="#FFD700" />}
        {Array(emptyStars).fill().map((_, index) => (
          <Icon key={`empty-${index}`} name="star-o" size={20} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: ecommerce.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{ecommerce.title}</Text>
        
        {/* Product Category */}
        <Text style={styles.category}>{ecommerce.category}</Text>
        
        {/* Product Description */}
        <HTML
          source={{ html: ecommerce.description }}
          contentWidth={300}
          style={styles.description}
        />
        
        <Text style={styles.price}>Price: ${ecommerce.price}</Text>

        {/* Display Rating with Stars */}
        <View style={styles.rating}>
          {renderStars(ecommerce.rating.rate)}
          <Text style={styles.ratingText}> ({ecommerce.rating.count} reviews)</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[styles.button, isProductInCart && styles.buttonAdded]}
          onPress={handleAddToCart}>
          <Text style={styles.buttonText}>
            {isProductInCart ? "🎉 Item is already in your cart!" : "🛒 Add to Cart"}
          </Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleShare}>
          <Text style={styles.buttonText}>📤 Share Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Soft gray for a clean look
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 20, // To give a smoother look for the image
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E1E1E", // Rich black for better contrast
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#888", // Light gray for category
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#333", // Dark gray for text readability
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    color: "#FFD700", // Gold for a premium feel
    marginBottom: 20,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingStars: {
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 16,
    color: "#888", // Lighter gray for rating text
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#0D47A1", // Deep blue for main buttons
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonAdded: {
    backgroundColor: "#1976D2", // Slightly lighter blue for added items
  },
  secondaryButton: {
    backgroundColor: "#FFD700", // Gold for secondary actions
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
