import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logger} from 'react-native-logs';
import styles from '../Styles/LoginScreen';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
  LoginProvider,
} from '@web3auth/react-native-sdk';
import axios from 'axios';
import LandingPage from './LandingPage';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../Redux/Actions/UserActions';
import {store} from '../../Redux/store';
import RPC from '../../ethersRPC'; // for using ethers.js
const scheme = 'carpool://auth'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  'BLOwyDDYwHFKGpp1ffvnfz3IY9_rvTBbwH7U__xudIgauSPzG7NadwFVspA4-PIgIUcwIDDL_3QBEUUp-X3oBl8';

const LoginScreen = ({navigation}) => {
  const [userLoginInfo, setUserLoginIInfo] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const Log = logger.createLogger();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const login = async () => {
    try {
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.TESTNET, // or other networks
      });
      // const openloginAdapter = new OpenloginAdapter({
      //   adapterSettings: {
      //     clientId, //Optional - Provide only if you haven't provided it in the Web3Auth Instantiation Code
      //     network: 'testnet',
      //   },
      // });
      // web3auth.configureAdapter(openloginAdapter);

      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'default',
        curve: 'secp256k1',
      });
      setUserLoginIInfo(info.userInfo);
      if (userLoginInfo) {
        dispatch(userLogin(userLoginInfo));
        setIsUserLoggedIn(true);
        // const res = await axios.post(
        //   'http://localhost:4000/users/',
        //   userLoginInfo,
        // );
        // Log.info('pinata response', res.data);
      }
    } catch (e) {
      Log.info(e);
    }
  };
  if (isUserLoggedIn) {
    navigation.navigate('TabNavigator');
  }
  const handleSignupPress = () => {
    navigation.navigate('TabNavigator');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/logo_transparent.png')} // Replace with the path to your app logo
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.descriptionText}>
        To the easiest way to share and earn Karma!
      </Text>
      <TouchableOpacity style={styles.googleSignInButton} onPress={login}>
        <Icon name="google" size={24} color="#fff" />
        <Text style={styles.googleSignInButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupPress}>
        <Text style={styles.signupText}>Not a member yet? Signup here!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
