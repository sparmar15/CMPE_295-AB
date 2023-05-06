import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './UI/Screens/Navigation/TabNavigator';
import OnboardingScreen from './UI/Screens/OnboardingScreen';
import LoginScreen from './UI/Screens/LoginScreen';
import DriverRiderScreen from './UI/Screens/SignUpScreens/DriverRiderScreen';
import RiderSignupScreen from './UI/Screens/SignUpScreens/RiderSignupScreen';
import {store, persistor} from './Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import HomePage from './UI/Screens/HomePage';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import LandingPage from './UI/Screens/LandingPage';
import SearchPage from './UI/Screens/SearchPage';
import TripRoute from './UI/Screens/TripRoute';
import ConfirmRidePage from './UI/Screens/ConfirmRidePage';
import SelectDriverPage from './UI/Screens/SelectDriverPage.js';
import BookingDetails from './UI/Screens/BookingDetails';
function App(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="DriverRiderSelect"
              component={DriverRiderScreen}
            />
            {/* <Stack.Screen name="RiderSignup" component={RiderSignupScreen} /> */}
            <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
            <Stack.Screen
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
            <Stack.Screen
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
            <Stack.Screen
              name="BookingDetails"
              component={BookingDetails}
              options={{
                presentation: 'transparentModal',
                transitionSpec: {
                  open: {animation: 'timing', config: {duration: 100}},
                  close: {animation: 'timing', config: {duration: 100}},
                },
              }}
            />
            <Stack.Screen
              name="TripRoute"
              component={TripRoute}
              options={{
                presentation: 'transparentModal',
                transitionSpec: {
                  open: {animation: 'timing', config: {duration: 100}},
                  close: {animation: 'timing', config: {duration: 100}},
                },
              }}
            />
            <Stack.Screen
              name="ConfirmRidePage"
              component={ConfirmRidePage}
              options={{
                presentation: 'card',
                transitionSpec: {
                  open: {animation: 'timing', config: {duration: 100}},
                  close: {animation: 'timing', config: {duration: 100}},
                },
              }}
            />
            <Stack.Screen
              name="SelectDriverPage"
              component={SelectDriverPage}
              options={{
                presentation: 'card',
                transitionSpec: {
                  open: {animation: 'timing', config: {duration: 100}},
                  close: {animation: 'timing', config: {duration: 100}},
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
