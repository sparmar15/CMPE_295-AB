import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';
import {logger} from 'react-native-logs';
import styles from '../Styles/LoginScreen';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
} from '@web3auth/react-native-sdk';
import LandingPage from './LandingPage';

import axios from 'axios';

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

  const handleLoginGoogle = async () => {
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
      console.log('Logged In');
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = text => {
    setUsername(text);
  };

  const handlePasswordChange = text => {
    setPassword(text);
  };

  const handleSubmit = () => {
    // Check if username is valid
    let DBusername;
    let DBpassword;
    axios
      .get(`http://localhost:4000/login`)
      .then(response => {
        console.log(response.data);
        DBusername = response.data.password;
        DBpassword = response.data.password;
        setUsernameError('');
      })
      .catch(error => {
        setUsernameError(
          <Text style={styles.error}>Username doesn't exist</Text>,
        );
        console.log("DEBUG: Username doesn't exist in the database");
        console.error(error);
      });

    if (!username || username.trim().length === 0) {
      setUsernameError(
        <Text style={styles.error}>Please enter a valid username</Text>,
      );
    }
    // Check if password is valid
    if (!password || password.trim().length === 0) {
      setPasswordError(
        <Text style={styles.error}>Please enter a valid password</Text>,
      );
    } else if (DBpassword.toString() !== password) {
      setPasswordError(<Text style={styles.error}>Incorrect Password</Text>);
    } else {
      setPasswordError('');
    }
  };

  const handleForgotPasswordPress = () => {
    // console.log('Forgot password pressed');
    navigation.navigate('LandingPage');
  };

  const handleSignupPress = () => {
    navigation.navigate('DriverRiderSelect');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../Assets/logo_transparent.png')}
      />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        The easiest and quickest way to share rides and earn Karma.
      </Text>
      <View style={styles.after} />
      <View>
        <Text style={styles.label}>
          {usernameError ? usernameError : 'Username'}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleUsernameChange}
          value={username}
        />
      </View>
      <View style={styles.after} />
      <Text style={styles.label}>
        {passwordError ? passwordError : 'Password'}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
      />
      <View style={styles.after} />
      <Pressable onPress={handleForgotPasswordPress}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </Pressable>
      <View style={styles.after} />
      <Button
        onPress={handleSubmit}
        style={styles.button}
        title="Submit"
        accessibilityLabel="Signin to your account"
      />
      <Text>OR</Text>
      <Button
        onPress={handleLoginGoogle}
        style={styles.button}
        title="Google"
        accessibilityLabel="Signin to your account"
      />
      <View style={styles.after} />
      <Pressable onPress={handleSignupPress}>
        <Text style={styles.desc}>Not a member yet? Signup here!</Text>
      </Pressable>
    </SafeAreaView>
  );
};
}
export default LoginScreen;
