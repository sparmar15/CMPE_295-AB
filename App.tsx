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
import DriverRiderScreen from './UI/Screens/SignUpScreens/DriverRiderScreen';
// import DriverSignupScreen from './UI/Screens/SignUpScreens/DriverSignupScreen';

function App(): JSX.Element {
  const AppStack = createStackNavigator();

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
        <AppStack.Screen
          name="DriverRiderSelect"
          component={DriverRiderScreen}
        />
        {/* <AppStack.Screen name="DriverSignup" component={DriverSignupScreen} /> */}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
