import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importing Icon library
import { fetchDataProducts } from "../services/products";
import { items } from "../data/items";

export default function ListScreen({ navigation, cart, addToCart }) {
  const [productsEcom, setProductsEcom] = useState(items);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetchDataProducts();
      const shuffledProducts = shuffleArray(response);
      setProductsEcom(shuffledProducts);
    } catch (error) {
      console.error("Error fetching ecommerce data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
    fetchData(); // Fetch products
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

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      fetchData(); // Fetch all products if "All" category is selected
    } else {
      fetchProductsByCategory(category);
    }
  };

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setProductsEcom(data);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#A88905" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* E-commerce Brand Name */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandName}>ShopSphere</Text>
        <Icon
          name="storefront"
          size={25} // Reduced the size of the brand logo
          color="#A88905"
          style={styles.cartIcon}
        />
      </View>

      {/* Categories List */}
      <ScrollView horizontal style={styles.categoriesContainer}>
        {/* Add "All" category */}
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "All" && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryPress("All")}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === "All" && styles.selectedCategoryText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={productsEcom}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ecomItem}
            onPress={() => handleEcomPress(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
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
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Centering the brand logo and name
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
  brandName: {
    fontSize: 20, // Reduced the font size for the brand name
    fontWeight: "bold", // Bold text to make it stand out
    color: "#A88905", // Gold color for the brand name
    letterSpacing: 2, // Slightly increased letter spacing for a clean look
    marginRight: 10, // Spacing between text and icon
    textTransform: "uppercase", // Uppercase to give it a more modern feel
  },
  cartIcon: {
    marginLeft: 5,
  },
  categoriesContainer: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  categoryButton: {
    backgroundColor: "#A88905",
    paddingVertical: 12, // Adjusted vertical padding for better balance
    paddingHorizontal: 20,
    marginRight: 15, // Margin between category buttons
    borderRadius: 30, // Rounded corners for elegance
    alignItems: "center",
    justifyContent: "center",
    height: 50, // Fixed height to avoid text being cut off
    borderWidth: 2, // Adding border to the category buttons
    borderColor: "#F8D85C", // Lighter gold border color
    shadowColor: "#000", // Soft shadow for elegance
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 1 }], // Smooth scale effect on hover or tap
    transition: "all 0.3s ease", // Smooth transition effect for hover state
  },
  selectedCategory: {
    backgroundColor: "#F8D85C", // Light yellow for selected category
    borderColor: "#A88905", // Darker border color when selected
  },
  categoryText: {
    fontSize: 16, // Adjusted font size for category text
    color: "#fff", // White text for better visibility
    fontWeight: "bold",
    textAlign: "center", // Ensures the text is centered horizontally
    lineHeight: 22, // Vertically centers the text inside the button
  },
  selectedCategoryText: {
    color: "#2C2C2C", // Darker text for selected category
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
