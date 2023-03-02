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
import styles from '../Styles/LoginScreen';

const LoginScreen = ({navigation}) => {
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
    if (!username || username.trim().length === 0) {
      setUsernameError(
        <Text style={styles.error}>Please enter a valid username</Text>,
      );
    } else {
      setUsernameError('');
    }

    // Check if password is valid
    if (!password || password.trim().length === 0) {
      setPasswordError(
        <Text style={styles.error}>Please enter a valid password</Text>,
      );
    } else {
      setPasswordError('');
    }
  };

  const handleForgotPasswordPress = () => {
    console.log('Forgot password pressed');
  };

  const handleSignupPress = () => {
    navigation.navigate('DriverRiderSelect');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../Assets/background.jpeg')}
        resizeMode="cover"
        style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../Assets/logo_transparent.png')}
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          The easiest and quickest way to share rides and earn Karma.
        </Text>
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
        <View>
          <Text style={styles.label}>
            {passwordError ? passwordError : 'Password'}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry
          />
        </View>
        <Pressable onPress={handleForgotPasswordPress}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
        <View style={styles.container2}>
          <Button
            onPress={handleSubmit}
            style={styles.button}
            title="Submit"
            accessibilityLabel="Signin to your account"
          />
          <Pressable onPress={handleSignupPress}>
            <Text style={styles.desc}>Not a member yet? Signup here!</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;
