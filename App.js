import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import Icon
import SplashScreen from "./src/screens/SplashScreen";
import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";
import CartScreen from "./src/screens/CartScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="ListScreen"
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CartScreen")}
                style={{ marginRight: 20 }}
              >
                <View style={styles.cartContainer}>
                  <Icon
                    name="cart"
                    size={24}
                    color="#A88905"
                  />
                  <Text style={styles.cartText}>{cart.length} Items</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => (
            <ListScreen
              {...props}
              cart={cart}
              addToCart={addToCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="DetailScreen">
          {(props) => (
            <DetailScreen
              {...props}
              addToCart={addToCart}
              cart={cart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CartScreen">
          {(props) => (
            <CartScreen
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartText: {
    fontSize: 14,
    color: "#A88905", // Cart text color
    marginLeft: 5,
  },
});
