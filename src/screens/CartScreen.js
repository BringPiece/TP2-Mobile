import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import RenderHTML from "react-native-render-html";

export default function CartScreen({ cart, removeFromCart }) {
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                removeFromCart={removeFromCart}
              />
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Price:</Text>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
}

function CartItem({ item, removeFromCart }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <RenderHTML
          contentWidth={200}
          source={{
            html: showFullDescription ? item.description : `${item.description.slice(0, 50)}...`,
          }}
        />
        <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
          <Text style={styles.readMore}>{showFullDescription ? "Show Less" : "Read More"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8", // Light, neutral background
    padding: 20,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50", // Darker text for good contrast
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 18,
    color: "#E74C3C", // Strong red for emphasis
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF", // White card background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000", // Shadow for card effect
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, // Android shadow
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 20,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E", // Dark shade for readability
  },
  price: {
    fontSize: 16,
    color: "#27AE60", // Green to indicate price
    marginBottom: 5,
  },
  readMore: {
    fontSize: 14,
    color: "#3498DB", // Blue for interactivity
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#E74C3C", // Vibrant red for the delete button
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF", // White text for high contrast
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ECF0F1", // Subtle gray for the total price container
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#BDC3C7", // Border to define space
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495E",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#27AE60",
  },
});
