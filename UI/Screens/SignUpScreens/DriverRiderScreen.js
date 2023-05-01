import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import styles from '../../Styles/SignUpScreens/DriverRiderScreen';

export default function DriverRiderScreen({navigation}) {
  const handleDriverPress = () => {
    navigation.navigate('DriverSignup');
  };
  const handleRiderPress = () => {
    navigation.navigate('RiderSignup');
  };

  const handleHistoryPress = () => {
    navigation.navigate('RideHistory');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="black"
          labelVisible={true}
        />
      </View>

      <TouchableOpacity onPress={handleDriverPress} style={styles.optionButton}>
        <Image
          source={require('../../Assets/driver.jpg')}
          style={styles.image}
        />
        <Text style={styles.optionText}>Host a Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRiderPress} style={styles.optionButton}>
        <Image
          source={require('../../Assets/rider.jpg')}
          style={styles.image}
        />
        <Text style={styles.optionText}>Request a Ride</Text>
      </TouchableOpacity>

      <Button title="RideHistory"  onPress={handleHistoryPress}>
        Ride Hisotry
      </Button>
    </SafeAreaView>
  );
}
