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
import styles from '../../Styles/SignUpScreens/DriverSignupScreenTwo';

export default function DriverSignupTwo({navigation, route}) {
  //const { userInfo } = props;
  const{userInfo} = route.params;
  const [driverInfo, setDriverInfo] = useState({
    userInfo: {...userInfo},
    license_plate: '',
    vehicle_brand: '',
    vehicle_model: '',
    vehicle_color: '',
    no_of_seats: '',
    driver_license: '',
  });

  const [errors, setErrors] = useState({});

  const validateLicensePlate = license_plate => {
    const licensePlateRegex = /^[A-Za-z0-9]{2,6}[- ]?[A-Za-z0-9]{2,6}$/;
    if (!licensePlateRegex.test(license_plate)) {
      return 'Please enter a valid license plate number';
    }
    return null;
  };

  const validateSeatCount = no_of_seats => {
    const seatCountRegex = /^[1-9]|10$/;
    if (!seatCountRegex.test(no_of_seats)) {
      return 'Please enter a valid number of seats';
    }
    return null;
  };

  const validateDriverLicense = driver_license => {
    const driverLicenseRegex = /^[A-Za-z0-9]{2,6}[- ]?[A-Za-z0-9]{2,6}$/;
    if (!driverLicenseRegex.test(driver_license)) {
      return 'Please enter a valid driver\'s license number';
    }
    return null;
  };

  // const validatePassword = password => {
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  //   if (!passwordRegex.test(password)) {
  //     return 'Minimum six characters, at least one letter and one number';
  //   }
  //   return null;
  // };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (!driverInfo.driver_license) {
      newErrors.name = 'Driver\'s License number is required';
      isValid = false;
    }
    const driverLicenseError = validateDriverLicense(driverInfo.driver_license);
    if (driverLicenseError) {
      newErrors.driver_license = driverLicenseError;
      isValid = false;
    }

    if (!driverInfo.license_plate) {
      newErrors.license_plate = 'License plate number is required';
      isValid = false;
    }
    const licensePlateError = validateLicensePlate(driverInfo.license_plate);
    if (licensePlateError) {
      newErrors.license_plate = licensePlateError;
      isValid = false;
    }

    if (!driverInfo.vehicle_brand) {
      newErrors.vehicle_brand = 'Vehicle brand is required';
      isValid = false;
    }

    if (!driverInfo.vehicle_model) {
      newErrors.vehicle_model = 'Vehicle model is required';
      isValid = false;
    }

    if (!driverInfo.vehicle_color) {
      newErrors.vehicle_color = 'Vehicle color is required';
      isValid = false;
    }

    if (!driverInfo.no_of_seats) {
      newErrors.no_of_seats = 'Seat count is required';
      isValid = false;
    }
    const seatCountError = validateSeatCount(driverInfo.no_of_seats);
    if (seatCountError) {
      newErrors.no_of_seats = seatCountError;
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const onChangeText = (key, val) => {
    setDriverInfo({...driverInfo, [key]: val});
    setErrors({...errors, [key]: null});
  };

  const signUp = async () => {
    if (!driverInfo.license_plate || !driverInfo.vehicle_brand || !driverInfo.vehicle_model || !driverInfo.vehicle_color || !driverInfo.no_of_seats || !driverInfo.driver_license) {
      alert('Please fill all required fields!');
      return;
    }
    if (validateInputs()) {
      try {
        // here place your signup logic
        console.log('user successfully signed up!: ', driverInfo);
        console.log(driverInfo.driver_license);
        console.log(userInfo);
      } catch (err) {
        console.log('error signing up: ', err);
      }
    }
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

        {errors.driver_license ? (
          <Text style={styles.error}>{errors.driver_license}</Text>
        ) : (
          <Text style={styles.label}>Driver's License Number</Text>
        )}
        <TextInput
          style={styles.input}
          // secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('driver_license', val)}
        />

        {errors.license_plate ? (
          <Text style={styles.error}>{errors.license_plate}</Text>
        ) : (
          <Text style={styles.label}>Vehicle License Plate</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('license_plate', val)}
        />

        {errors.vehicle_brand ? (
          <Text style={styles.error}>{errors.vehicle_brand}</Text>
        ) : (
          <Text style={styles.label}>Vehicle Brand</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('vehicle_brand', val)}
        />

        {errors.vehicle_model ? (
          <Text style={styles.error}>{errors.vehicle_model}</Text>
        ) : (
          <Text style={styles.label}>Vehicle Model</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('vehicle_model', val)}
        />

        {errors.vehicle_color ? (
          <Text style={styles.error}>{errors.vehicle_color}</Text>
        ) : (
          <Text style={styles.label}>Vehicle Color</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('vehicle_color', val)}
        />

        {errors.no_of_seats ? (
          <Text style={styles.error}>{errors.no_of_seats}</Text>
        ) : (
          <Text style={styles.label}>Total Seat Occupancy</Text>
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#FFFFFF"
          onChangeText={val => onChangeText('no_of_seats', val)}
        />
        
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}