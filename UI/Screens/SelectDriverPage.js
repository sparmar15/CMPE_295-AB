import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ethers} from 'ethers';
import PaymentScreen from './PaymentScreens/PaymentScreen';
// import MyContract from '../../artifacts/contracts/ConfirmRide.sol/RideContract.json';
import {logger} from 'react-native-logs';
import {useNavigation} from '@react-navigation/native';

const SelectDriverPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {tripRoute, rideDetails} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: rideDetails.driver.profileImage}}
      />
      <Text style={styles.text}>
        Confirm your ride with {rideDetails.driver.name}?
      </Text>
      <View style={styles.paymentContainer}>
        <PaymentScreen
          amount={rideDetails.fare}
          buttoText={'Pay using USD'}
          rideDetails={rideDetails}
          tripRoute={tripRoute}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButton: {
    marginTop: 4,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txHash: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  paymentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SelectDriverPage;
