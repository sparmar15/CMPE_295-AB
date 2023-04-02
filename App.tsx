import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './UI/Screens/Navigation/TabNavigator';
import OnboardingScreen from './UI/Screens/LoginScreens/OnboardingScreen';
import LoginScreen from './UI/Screens/LoginScreens/LoginScreen';
import DriverRiderScreen from './UI/Screens/SignUpScreens/DriverRiderScreen';
import RiderSignupScreen from './UI/Screens/SignUpScreens/RiderSignupScreen';
import {store, persistor} from './Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Text} from 'react-native';

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
            <Stack.Screen name="RiderSignup" component={RiderSignupScreen} />
            <Stack.Screen name="HomeStack" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
