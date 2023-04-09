import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SearchPage from '../SearchPage';
import TripRoute from '../TripRoute';
import LandingPage from '../LandingPage';
import UserProfile from '../UserProfile';
import ChatScreen from '../InboxStack/ChatScreen';
import InboxScreen from '../InboxStack/InboxScreen';
// import Contact from '../screens/Contact';

const Stack = createStackNavigator();

const screenOptionStyle = {
  // headerStyle: {
  //   backgroundColor: '#9AC4F8',
  // },
  headerTintColor: 'gray',
  headerBackTitle: 'Back',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
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
    </Stack.Navigator>
  );
};

const UserProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

const InboxNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Inboxscreen" component={InboxScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, UserProfileNavigator, InboxNavigator};
