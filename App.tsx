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
function App(): JSX.Element {
  const AppStack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <AppStack.Navigator screenOptions={{headerShown: false}}>
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="HomePage" component={HomePage} />
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
