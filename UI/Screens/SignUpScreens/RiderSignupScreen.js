import {HeaderBackButton} from '@react-navigation/elements';
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../Styles/SignUpScreens/RiderSignupScreen';
import axios from 'axios';

export default function RiderSignupScreen({navigation}) {
  const [userInfo, setUserInfo] = useState({
    _id: '007',
    username: '',
    password: '',
    email: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validatePhoneNumber = phoneNumber => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return 'Please enter a valid 10-digit phone number';
    }
    return null;
  };

  const validatePassword = password => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return 'Minimum six characters, at least one letter and one number';
    }
    return null;
  };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (!userInfo.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    if (!userInfo.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    const passwordError = validatePassword(userInfo.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }
    if (!userInfo.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    const emailError = validateEmail(userInfo.email);
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }
    if (!userInfo.phone_number) {
      newErrors.phone_number = 'Phone number is required';
      isValid = false;
    }

    const phoneNumberError = validatePhoneNumber(userInfo.phone_number);
    if (phoneNumberError) {
      newErrors.phone_number = phoneNumberError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onChangeText = (key, val) => {
    setUserInfo({...userInfo, [key]: val});
    setErrors({...errors, [key]: null});
  };

  const signUp = async () => {
    if (validateInputs()) {
      try {
        // here place your signup logic
        // const username = userInfo.username;
        // const password = userInfo.password;
        axios
          .post('http://localhost:4000/riders/', userInfo)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        console.log(
          'DEBUG: username and password sent to orbitDB put API call',
        );
        console.log('user successfully signed up!: ', userInfo);
      } catch (err) {
        console.log('error signing up: ', err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBackButton
        onPress={() => navigation.goBack()}
        tintColor="black"
        labelVisible={true}
        styles={styles.backButtonContainer.container}
      />
      <View style={styles.after} />
      <Text style={styles.title}>Signup</Text>
      <Text style={styles.subtitle}>
        Enter your information below to get started!
      </Text>
      <View style={styles.after} />
      {errors.username ? (
        <Text style={styles.error}>{errors.username}</Text>
      ) : (
        <Text style={styles.label}>Username</Text>
      )}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF"
        onChangeText={val => onChangeText('username', val)}
      />
      <View style={styles.after} />
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : (
        <Text style={styles.label}>Password</Text>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF"
        onChangeText={val => onChangeText('password', val)}
      />
      <View style={styles.after} />
      {errors.email ? (
        <Text style={styles.error}>{errors.email}</Text>
      ) : (
        <Text style={styles.label}>Email</Text>
      )}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF"
        onChangeText={val => onChangeText('email', val)}
      />
      <View style={styles.after} />
      <View style={styles.after} />
      {errors.phone_number ? (
        <Text style={styles.error}>{errors.phone_number}</Text>
      ) : (
        <Text style={styles.label}>Phone Number</Text>
      )}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="#FFFFFF"
        onChangeText={val => onChangeText('phone_number', val)}
      />
      <View style={styles.after} />
      <Button
        onPress={signUp}
        style={styles.button}
        title="Signup"
        accessibilityLabel="Signup"
      />
    </SafeAreaView>
  );
}
