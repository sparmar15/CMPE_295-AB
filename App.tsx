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
import RiderSignupScreen from './UI/Screens/SignUpScreens/RiderSignupScreen';
import SearchPage from './UI/Screens/SearchPage';
import LandingPage from './UI/Screens/LandingPage';
import SearchBar from './UI/Screens/SearchBar';
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
        <AppStack.Screen name="RiderSignup" component={RiderSignupScreen} />
        <AppStack.Screen name="LandingPage" component={LandingPage} />
        <AppStack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{
            presentation: 'transparentModal',
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 100}},
              close: {animation: 'timing', config: {duration: 100}},
            },
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
