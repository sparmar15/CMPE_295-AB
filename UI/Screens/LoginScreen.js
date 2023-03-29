import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logger} from 'react-native-logs';
import styles from '../Styles/LoginScreen';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import LandingPage from './LandingPage';

const scheme = 'carpool://auth'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  'BG9JhziXn3TewAdwRyUyinmvLCmC8z8h_0TIWQ25C-PSXd875e_ocLjhk8eb10-JRQZ7mVOCASXN4WLBAjo8BAY';

const LoginScreen = ({navigation}) => {
  const [key, setKey] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [console, setConsole] = useState('');
  const Log = logger.createLogger();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      setConsole('Logging in');
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.CYAN, // or other networks
      });
      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'default',
        curve: 'secp256k1',
      });

      const username = info.userInfo.email;

      if (username === db.email) {
        setIsLoggedIn(true);
      }

      setUserInfo(info);
      setKey(info.privKey);
    } catch (e) {
      console.error(e);
    }
  };

  // const getChainId = async () => {
  //   setConsole('Getting chain id');
  //   const networkDetails = await RPC.getChainId();
  //   uiConsole(networkDetails);
  // };

  // const getAccounts = async () => {
  //   setConsole('Getting account');
  //   const address = await RPC.getAccounts(key);
  //   uiConsole(address);
  // };
  // const getBalance = async () => {
  //   setConsole('Fetching balance');
  //   const balance = await RPC.getBalance(key);
  //   uiConsole(balance);
  // };
  // const sendTransaction = async () => {
  //   setConsole('Sending transaction');
  //   const tx = await RPC.sendTransaction(key);
  //   uiConsole(tx);
  // };
  // const signMessage = async () => {
  //   setConsole('Signing message');
  //   const message = await RPC.signMessage(key);
  //   uiConsole(message);
  // };

  // const uiConsole = (...args) => {
  //   setConsole(JSON.stringify(args || {}, null, 2) + '\n\n\n\n' + console);
  // };

  const handleSignupPress = () => {
    navigation.navigate('DriverRiderSelect');
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
      <Text style={styles.signupText}>Not a member yet? Signup here!</Text>
    </View>
  );
};

export default LoginScreen;
