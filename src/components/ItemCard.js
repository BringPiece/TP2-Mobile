import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ItemCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { flexDirection: "row", margin: 10, padding: 10, borderRadius: 10, backgroundColor: "#fff", elevation: 3 },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold" },
  description: { fontSize: 14, color: "#666" },
});

export default ItemCard;
