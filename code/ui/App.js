import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import SplashScreen from "./screens/SplashScreen";

const AppStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {/* <AppStack.Screen
          name="SplashScreen"
          component={SplashScreen}
        ></AppStack.Screen> */}
        <AppStack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
        ></AppStack.Screen>
        {/* <AppStack.Screen
          name="LoginScreen"
          componenet={LoginScreen}
        ></AppStack.Screen> */}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
