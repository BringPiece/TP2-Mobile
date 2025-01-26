import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: "List of Items" }} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: "Item Details" }} />
  </Stack.Navigator>
);

export default AppNavigator;
