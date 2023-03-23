/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from './UI/Screens/OnboardingScreen';
import LoginScreen from './UI/Screens/LoginScreen';
import UserProfileScreen from './UI/Screens/UserProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

function App(): JSX.Element {
  const AppStack = createStackNavigator();
  Ionicons.loadFont().then();

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
        <AppStack.Screen name="Signup" component={LoginScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen name="Profile" component={UserProfileScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
