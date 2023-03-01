import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';
import React from 'react';
import styles from '../Styles/LoginScreen';

function LoginScreen({navigation}) {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const signup = () => navigation.navigate('Signup');
  const submit = () => {
    // auth api call
  };
  const forgot = () => {
    // redirect to another forgot password page
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
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            onChange={onChangeUsername}
            value={Text}
            // placeholder="Username"
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChange={onChangePassword}
            value={Text}
            // placeholder="Password"
          />
        </View>
        <Pressable onPress={forgot}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
        <View style={styles.container2}>
          <Button
            onPress={submit}
            style={styles.button}
            title="Submit"
            accessibilityLabel="Signin to your account"
          />
          <Pressable>
            <Text onPress={signup} style={styles.desc}>
              Not a member yet? Signup here!
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default LoginScreen;
