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
import RideHistory from '../BookingScreens/RideHistory';
import RideInfo from '../BookingScreens/RideInfo';
import InboxScreen from '../InboxStack/InboxScreen';
import ChatScreen from '../InboxStack/ChatScreen';
import SelectCarScreen from '../SelectCarScreen';
import AddCarScreen from '../AddCarScreen';
import ScheduleRideScreen from '../ScheduleRideScreen';
import OccupantsScreen from '../OccupantsScreen';
import PaymentSuccess from '../PaymentScreens/PaymentSuccess';
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
        name="PaymentSuccess"
        component={PaymentSuccess}
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
        name="SelectCarScreen"
        component={SelectCarScreen}
        options={{
          headerTitle: 'Select Car',
          // presentation: 'transparentModal',
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 100}},
            close: {animation: 'timing', config: {duration: 100}},
          },
        }}
      />
      <Stack.Screen
        name="AddCarScreen"
        component={AddCarScreen}
        options={{
          headerTitle: 'Add new Vehicle',
          // presentation: 'transparentModal',
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 100}},
            close: {animation: 'timing', config: {duration: 100}},
          },
        }}
      />
      <Stack.Screen
        name="ScheduleRideScreen"
        component={ScheduleRideScreen}
        options={{
          headerTitle: 'Schedule Ride',
          // presentation: 'transparentModal',
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 100}},
            close: {animation: 'timing', config: {duration: 100}},
          },
        }}
      />
      <Stack.Screen
        name="OccupantsScreen"
        component={OccupantsScreen}
        options={{
          headerTitle: 'Select Passengers',
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
          headerTitle: 'Request Ride',
          // presentation: 'transparentModal',
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

const BookingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="RideHistory"
        component={RideHistory}
        options={({route}) => ({
          headerTitle: 'My Bookings',
        })}
      />
      <Stack.Screen
        name="RideInfo"
        component={RideInfo}
        options={({route}) => ({
          headerTitle: 'My Bookings',
        })}
      />
    </Stack.Navigator>
  );
};

const InboxNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={({route}) => ({
          headerTitle: 'Inbox',
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({route}) => ({
          headerTitle: 'Inbox',
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

export {
  MainStackNavigator,
  BookingNavigator,
  WalletNavigator,
  InboxNavigator,
  UserProfileNavigator,
};
