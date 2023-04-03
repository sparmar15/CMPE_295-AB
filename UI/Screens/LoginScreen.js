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
import axios from 'axios';
import LandingPage from './LandingPage';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../Redux/Actions/UserActions';
import {store} from '../../Redux/store';

const scheme = 'carma://auth'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  'BEneIKfFtIuRYXdjU744zPdwgcW2Y2ScwUR6DZ4s1KA_tcqxqsOGmzQRlLSKUPs5_zzVQKH5ZEnpss2s9byptF4';

const LoginScreen = ({navigation}) => {
  const [key, setKey] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [console, setConsole] = useState('');
  const Log = logger.createLogger();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const login = async () => {
    try {
      setConsole('Logging in');
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
      Log.info(info);

      const username = info.userInfo.email;

      if (username === db.email) {
        setIsLoggedIn(true);
      }

      setUserInfo(info);
      setKey(info.privKey);
    } catch (e) {
      Log.info(e);
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
    // navigation.navigate('inbox');
    // dispatch(userLogin({name: 'Mango'}));
    // Log.info(store.getState());
    navigation.navigate('Home');
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
