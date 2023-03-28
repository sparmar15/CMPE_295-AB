/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import OnboardingScreen from './UI/Screens/OnboardingScreen';
import LoginScreen from './UI/Screens/LoginScreen';
import DriverRiderScreen from './UI/Screens/SignUpScreens/DriverRiderScreen';
import RiderSignupScreen from './UI/Screens/SignUpScreens/RiderSignupScreen';
import ChatScreen from './UI/Screens/ChatScreen';
import SearchPage from './UI/Screens/SearchPage';
import LandingPage from './UI/Screens/LandingPage';
import SearchBar from './UI/Screens/SearchBar';
import TripRoute from './UI/Screens/TripRoute';
import {store, persistor} from './Redux/store';
import {Provider} from 'react-redux';
import {Text} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';

function App(): JSX.Element {
  const AppStack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="Login" component={LoginScreen} />
            <AppStack.Screen
              name="DriverRiderSelect"
              component={DriverRiderScreen}
            />
            <AppStack.Screen name="RiderSignup" component={RiderSignupScreen} />
            <AppStack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{
                presentation: 'transparentModal',
                transitionSpec: {
                  open: {animation: 'timing', config: {duration: 100}},
                  close: {animation: 'timing', config: {duration: 100}},
                },
              }}
            />
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
            <AppStack.Screen name="TripRoute" component={TripRoute} />
          </AppStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
