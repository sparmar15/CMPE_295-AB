import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {logger} from 'react-native-logs';
import styles from '../../Styles/LoginScreens/LoginScreen';
import web3Auth from '../../../Utils/web3Auth';

const LoginScreen = ({navigation}) => {
  // const [key, setKey] = useState('');
  // const [userInfo, setUserInfo] = useState('');
  // const [console, setConsole] = useState('');
  const Log = logger.createLogger();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const dispatch = useDispatch();
  const {login} = web3Auth();

  const handleLogin = async () => {
    // setUserInfo(info);
    // Log.info(info);
    navigation.navigate('TabNavigator');
  };

  const handleSignupPress = async () => {
    const info = await login();
    // const info = await getBalance();
    // navigation.navigate('DriverRiderSelect');
    // dispatch(userLogin({name: 'sid', pass: '123'}));
    // Log.info(info);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/logo.png')} // Replace with the path to your app logo
        style={styles.logo}
      />
      <Image
        source={require('../../Assets/onboarding3.jpg')} // Replace with the path to your app logo
        style={styles.photo}
      />

      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.descriptionText}>
        To the easiest way to share and earn Karma!
      </Text>
      <TouchableOpacity style={styles.googleSignInButton} onPress={handleLogin}>
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
