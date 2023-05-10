import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from '../SettingScreens/UserProfile';
import WalletScreen from '../PaymentScreens/WalletScreen';
import TopUpWallet from '../PaymentScreens/TopUpWallet';
import SearchPage from '../SearchPage';
import LandingPage from '../LandingPage';
import TripRoute from '../TripRoute';
import PaymentScreen from '../PaymentScreens/PaymentScreen';
import SelectDriverPage from '../SelectDriverPage';
import ConfirmRidePage from '../ConfirmRidePage';
import BookingDetails from '../BookingDetails';
// import Contact from '../screens/Contact';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  // headerTintColor: 'gray',
  headerBackTitle: 'Back',
  // headerShown: false,
  // presentation: 'transparentModal',
  // transitionSpec: {
  //   open: {animation: 'timing', config: {duration: 100}},
  //   close: {animation: 'timing', config: {duration: 100}},
  // },
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          headerTitle: 'Home',
          headerLeft: null,
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
          headerTitle: 'Select Address',
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
          headerTitle: 'Trip',
          presentation: 'transparentModal',
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
          headerTitle: 'Select Ride',
          // presentation: 'transparentModal',
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
          headerTitle: 'Choose Ride',
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
          headerTitle: 'Booking Details',
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 100}},
            close: {animation: 'timing', config: {duration: 100}},
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UserProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={({route}) => ({
          headerTitle: 'Settings',
          headerLeft: null,
        })}
      />
    </Stack.Navigator>
  );
};

const WalletNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Wallet/Main"
        component={WalletScreen}
        options={({route}) => ({
          headerTitle: 'My E-Wallet',
          headerLeft: null,
        })}
      />
      <Stack.Screen
        name="Wallet/Topup"
        component={TopUpWallet}
        options={({route}) => ({
          headerTitle: 'Top Up Wallet',
        })}
      />
      <Stack.Screen
        name="Wallet/Stripe"
        component={PaymentScreen}
        options={({route}) => ({
          headerTitle: 'Stripe Payment',
        })}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, UserProfileNavigator, WalletNavigator};
