import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://indodax.com/v2/logo/png/color/btc.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Crypto App</Text>
      <Text style={styles.subtitle}>Discover crypto to know new world.</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("ListScreen")}>
        <LinearGradient
          colors={["#FF7043", "#FF3E80"]}
          style={styles.button}>
          <Text style={styles.buttonText}>Explore Cryptos</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  logo: {
    width: width * 0.7, // Adjusted for better responsiveness
    height: width * 0.5,
    marginBottom: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#FF3E80",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
