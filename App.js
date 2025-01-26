import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";
import SplashScreen from "./src/screens/SplashScreen";
import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";
import CartScreen from "./src/screens/CartScreen";
import HomeScreen from "./src/screens/HomeScreen"

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
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="ListScreen"
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("CartScreen")}
                style={{ marginRight: 20 }}
              >
                <Text style={{ fontSize: 18, color: "#FF7043" }}>
                  Cart ({cart.length})
                </Text>
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => <ListScreen {...props} cart={cart} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="DetailScreen">
          {(props) => (
            <DetailScreen {...props} addToCart={addToCart} cart={cart} />
          )}
        </Stack.Screen>
        <Stack.Screen name="CartScreen">
          {(props) => (
            <CartScreen {...props} cart={cart} removeFromCart={removeFromCart} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

