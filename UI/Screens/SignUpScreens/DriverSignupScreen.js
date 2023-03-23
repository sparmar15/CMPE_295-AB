import {HeaderBackButton} from '@react-navigation/elements';
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../Styles/SignUpScreens/DriverSignupScreen';
import DriverSignupScreenTwo from './DriverSignupScreenTwo.js';

export default function DriverSignupScreen({navigation}) {
  const [userInfo, setUserInfo] = useState({
    name: '',
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

    if (!userInfo.name) {
        newErrors.name = 'A name is required';
        isValid = false;
      }
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

  const handleNextPress = () => {
    if (!userInfo.name || !userInfo.username || !userInfo.password || !userInfo.email || !userInfo.phone_number) {
      alert('Please fill all required fields!');
      return;
    }
    navigation.navigate('DriverSignupTwo', {userInfo});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../Assets/background.jpeg')}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.backButtonContainer}>
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            tintColor="black"
            labelVisible={true}
          />
        </View>

        {errors.name ? (
          <Text style={styles.error}>{errors.name}</Text>
        ) : (
          <Text style={styles.label}>Name</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('name', val)}
        />

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
        {/* <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={handleNextPress} style={styles.button}>
        <Text style={styles.optionText}>Next</Text>
      </TouchableOpacity>


        {/* <TouchableOpacity style={styles.button}>
          {userInfo ?
            <DriverSignupScreenTwo/> :
            <DriverSignupScreen/>
          }
        <Text style={styles.optionText}>Next</Text>
      </TouchableOpacity> */}

      </ImageBackground>
    </SafeAreaView>
  );
}