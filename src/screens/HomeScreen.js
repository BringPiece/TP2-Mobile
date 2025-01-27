import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#FFEFBA", "#FFFFFF"]}
      style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/background-e-commerce-elements-flat-design_23-2147669145.jpg",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Ecommerce App</Text>
      <Text style={styles.subtitle}>Discover exclusive products and shop the latest trends!</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("ListScreen")}>
        <LinearGradient
          colors={["#FF7E5F", "#FEB47B"]}
          style={styles.button}>
          <Text style={styles.buttonText}>Explore Products</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF7E5F",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
    shadowColor: "#FF7E5F",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
