import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import RPC from '../../../ethersRPC'; // for using ethers.js
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {MERCHANT_ID, API_URL} from './Constants';
import {useNavigation} from '@react-navigation/native';
const key = '171c96507352fe681cd3d70f85299c9b7da2d2e7ec9d9e0191d0e90479e07e94';
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
  const [balanceETH, setBalanceETH] = useState('');
  const [dueETH, setdueETH] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [hash, setHash] = useState();

  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading,
    resetPaymentSheetCustomer,
  } = usePaymentSheet();
  const navigation = useNavigation();
  useEffect(() => {
    console.log(modalVisible);
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
        screen: 'PaymentSuccess',
        params: {rideDetails: rideDetails, tripRoute: tripRoute},
      });
    }
  }
  const handlePay = async () => {
    const tx = await RPC.sendTransaction(key);

    if (tx) {
      setIsPaymentDone(true);
      setModalVisible(false);
      setHash(tx);
      console.log('====================================');
      console.log(tx);
      console.log('====================================');
      navigation.navigate('Home', {
        screen: 'PaymentSuccess',
        params: {
          rideDetails: rideDetails,
          tripRoute: tripRoute,
          tx: tx,
        },
      });
    }
  };

  const handleModalClick = async function () {
    const balance = await RPC.getBalance(key);
    const ETH = await RPC.getETHVal(amount);
    setdueETH(ETH);
    setBalanceETH(balance);
    setModalVisible(true);
    console.log(ETH);
  };
  const handleTopUp = () => {
    navigation.navigate('Wallet', {
      screen: 'WalletNavigator',
    });
    setModalVisible(false);
  };
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

      <View style={styles.ETHPayContainer}>
        <TouchableOpacity style={styles.button} onPress={handleModalClick}>
          <Text style={styles.buttonText}>{'Pay using ETH'}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}>
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.balance}>
            <Text style={styles.balanceText}>Your Current Balance</Text>
            <Text style={styles.balanceText}>{balanceETH + ' ETH'}</Text>
          </View>
          <View style={styles.balance}>
            <Text style={styles.balanceText}>Your Current Due</Text>
            <Text style={styles.dueBalanceText}>{dueETH + ' ETH'}</Text>
          </View>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.payButton} onPress={handlePay}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topUpButton} onPress={handleTopUp}>
              <Text style={styles.payButtonText}>To-up Your Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    fontWeight: 'bold',
  },

  balance: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    alignItems: 'flex-start',
    margin: 20,
    height: 60,
    borderRadius: 8,
  },
  dueBalanceText: {
    marginLeft: 45,
    marginTop: 20,
  },
  balanceText: {
    margin: 20,
  },

  modalContent: {
    backgroundColor: 'white',

    justifyContent: 'space-between',
    width: '100%',
    height: '50%',
    marginHorizontal: 0,
    borderRadius: 8,
  },
  modalCloseButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#007acc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    // position: 'absolute',

    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalCloseText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  topUpButton: {
    backgroundColor: '#007acc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 80,
    marginLeft: 20,
    marginRight: 20,
  },
  ETHPayContainer: {
    margin: 10,
  },
  successContainer: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
