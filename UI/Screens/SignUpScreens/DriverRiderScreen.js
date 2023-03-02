import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import styles from '../../Styles/SignUpScreens/DriverRiderScreen';

export default function DriverRiderScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="black"
          labelVisible={true}
        />
      </View>

      <TouchableOpacity style={styles.optionButton}>
        <Image
          source={require('../../Assets/driver.png')}
          style={styles.image}
        />
        <Text style={styles.optionText}>I am a Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Image
          source={require('../../Assets/rider.png')}
          style={styles.image}
        />
        <Text style={styles.optionText}>I am a Rider</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
