import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View, Alert, StyleSheet} from 'react-native';
import {MERCHANT_ID, API_URL} from './Constants';

const PaymentScreen = () => {
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

  useEffect(() => {
    initialisePaymentSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialisePaymentSheet = async () => {
    const {paymentIntent} = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      appearance: {
        colors: {
          primary: '#0077cc',
          background: '#ffffff',
          componentBackground: '#f0f0f0',
          componentDivider: '#dcdcdc',
          primaryText: '#0077cc',
          secondaryText: '#666666',
          componentText: '#282c34',
          icon: '#c00e1e',
          placeholderText: '#aaaaaa',
        },
        shapes: {
          borderRadius: 25,
        },
      },
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Example Inc.',
      applePay: {
        merchantCountryCode: 'US',
      },
      googlePay: {
        merchantCountryCode: 'US',
        testEnv: true,
        currencyCode: 'usd',
      },
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payments/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  async function buy() {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'The payment was confirmed successfully');
      setReady(false);
    }
  }

  return (
    <View style={styles.container}>
      <StripeProvider
        publishableKey="pk_test_51N3HUWLHuLtWJqHPT2fWV3Uo9ulMNPUoWeetUB3lafGkHNnUqfdyScCcyROwCVOOijz2PCCShUbk326225JARJpU007P5GnL3S"
        merchantIdentifier={MERCHANT_ID}>
        <Text>1 kg of Sweet Potatoes</Text>
        {/* <Image source={require('./potato.jpeg')} style={styles.image} /> */}

        <View style={styles.buttons}>
          <Button title={'Buy'} onPress={buy} disabled={loading || !ready} />
        </View>
      </StripeProvider>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    height: 250,
    width: 250,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
});
