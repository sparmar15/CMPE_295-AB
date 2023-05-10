import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import {MERCHANT_ID, API_URL} from './Constants';
import {useNavigation} from '@react-navigation/native';

export interface PaymentScreenProps {
  amount: Number;
  buttoText: String;
  rideDetails: Object;
  tripRoute: Object;
}
const PaymentScreen = ({
  amount,
  buttoText,
  rideDetails,
  tripRoute,
}: PaymentScreenProps) => {
  const [ready, setReady] = useState(false);
  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading,
    resetPaymentSheetCustomer,
  } = usePaymentSheet();
  const navigation = useNavigation();
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
      body: JSON.stringify({amount: amount}),
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
      navigation.navigate('Home', {
        screen: 'BookingDetails',
        params: {rideDetails: rideDetails, tripRoute: tripRoute},
      });
    }
  }

  return (
    <View style={styles.container}>
      <StripeProvider
        publishableKey="pk_test_51N3HUWLHuLtWJqHPT2fWV3Uo9ulMNPUoWeetUB3lafGkHNnUqfdyScCcyROwCVOOijz2PCCShUbk326225JARJpU007P5GnL3S"
        merchantIdentifier={MERCHANT_ID}>
        <TouchableOpacity
          style={styles.button}
          onPress={buy}
          disabled={loading || !ready}>
          <Text style={styles.buttonText}>{buttoText}</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: '#4285F4',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
