import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MainStackNavigator,
  UserProfileNavigator,
  BookingNavigator,
  WalletNavigator,
  InboxNavigator,
} from './StackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'home-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Inbox') {
            iconName = focused ? 'mail' : 'mail-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Bookings" component={BookingNavigator} />
      <Tab.Screen name="Inbox" component={InboxNavigator} />
      <Tab.Screen name="Wallet" component={WalletNavigator} />
      <Tab.Screen name="Settings" component={UserProfileNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
