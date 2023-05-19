import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
const PaymentSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {rideDetails, tripRoute, tx} = route.params;

  setTimeout(() => {
    navigation.navigate('Home', {
      screen: 'BookingDetails',
      params: {rideDetails: rideDetails, tripRoute: tripRoute},
    });
  }, 3000);
  return (
    <View style={styles.container}>
      <Image source={require('../../Assets/success.gif')} />
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>
        Payment Successful!
      </Text>
      {tx && (
        <Text>
          {'Smart Contract Created With Hash ' +
            tx.slice(0, 5) +
            '********' +
            tx.slice(-5)}
        </Text>
      )}
    </View>
  );
};

export default PaymentSuccess;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
