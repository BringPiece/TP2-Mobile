import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace("HomeScreen");
    });
  }, [fadeAnim, navigation]);

  return (
    <LinearGradient
      colors={["#0D47A1", "#42A5F5"]} // Elegant gradient from deep blue to light blue
      style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>Ecommerce App</Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFD700", // Gold for a luxurious feel
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Subtle text shadow for depth
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
});
