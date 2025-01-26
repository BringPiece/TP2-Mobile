import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
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
              <CartItem item={item} removeFromCart={removeFromCart} />
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
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <RenderHTML
          contentWidth={200}
          source={{
            html: showFullDescription
              ? item.description
              : `${item.description.slice(0, 50)}...`,
          }}
        />
        <TouchableOpacity
          onPress={() => setShowFullDescription(!showFullDescription)}
        >
          <Text style={styles.readMore}>
            {showFullDescription ? "Show Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    padding: 20,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#424242",
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 18,
    color: "#FF7043",
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
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
    color: "#424242",
  },
  price: {
    fontSize: 16,
    color: "#FF7043",
    marginBottom: 5,
  },
  readMore: {
    fontSize: 14,
    color: "#FF7043",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFECB3",
    borderRadius: 8,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#424242",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7043",
  },
});
