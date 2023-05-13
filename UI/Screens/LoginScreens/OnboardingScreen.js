/* eslint-disable react-native/no-inline-styles */
// https://github.com/jfilter/react-native-onboarding-swiper
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from '../../Styles/LoginScreens/OnboardingScreen';
import Onboarding from 'react-native-onboarding-swiper';
import {useSelector} from 'react-redux';
import {logger} from 'react-native-logs';
import BottomTabNavigator from '../Navigation/TabNavigator';
// import LandingPage from './LandingPage';
const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.button}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.button}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.button}>Done</Text>
  </TouchableOpacity>
);

function OnboardingScreen({navigation}) {
  const userState = useSelector(state => state);
  const Log = logger.createLogger();

  let isUserLoggedIn = false;
  if (userState.userInfo != null) {
    isUserLoggedIn = userState.userInfo.userInfo.email != null ? true : false;
  }

  // Log.info(userState.userInfo.userInfo.email);
  return (
    <>
      {isUserLoggedIn ? (
        <BottomTabNavigator />
      ) : (
        <Onboarding
          SkipButtonComponent={Skip}
          NextButtonComponent={Next}
          DoneButtonComponent={Done}
          DotComponent={Dots}
          onSkip={() => navigation.navigate('Login')}
          onDone={() => navigation.navigate('Login')}
          pages={[
            {
              backgroundColor: '#fff',
              image: (
                <Image
                  style={styles.icon}
                  source={require('../../Assets/onboarding2.jpg')}
                />
              ),
              title: <Text style={styles.title}>Locate the Destination</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Your destination is on your fingertips
                </Text>
              ),
            },
            {
              backgroundColor: '#fff',
              image: (
                <Image
                  style={styles.icon}
                  source={require('../../Assets/onboarding5.jpg')}
                />
              ),
              title: <Text style={styles.title}>Select Your Ride</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Get quick access to rides and save them as favourites
                </Text>
              ),
            },
            {
              backgroundColor: '#fff',
              image: (
                <Image
                  style={styles.icon}
                  source={require('../../Assets/onboarding4.jpg')}
                />
              ),
              title: <Text style={styles.title}>Share Your Ride</Text>,
              subtitle: (
                <Text style={styles.subtitle}>
                  Fastest way to share a ride, share reviews and earn Karma
                </Text>
              ),
            },
          ]}
        />
      )}
    </>
  );
}

export default OnboardingScreen;
