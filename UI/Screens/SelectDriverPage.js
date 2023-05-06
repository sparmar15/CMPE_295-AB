import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ethers} from 'ethers';
import MyContract from '../../artifacts/contracts/ConfirmRide.sol/RideContract.json';
import {logger} from 'react-native-logs';
import {useNavigation} from '@react-navigation/native';
// const provider = new ethers.providers.JsonRpcProvider('HTTP://127.0.0.1:7545');
// const contractAddress = '0x9A54736Fbb2eC2414Ecb45E6aAa8f0f0De71585b';
// const privateKey =
//   '171c96507352fe681cd3d70f85299c9b7da2d2e7ec9d9e0191d0e90479e07e94';

const SelectDriverPage = ({riderName, riderPicture}) => {
  //   const [txHash, setTxHash] = useState(null);
  //   const Log = logger.createLogger();
  //   const contract = new ethers.Contract(contractAddress, MyContract.abi, provider);
  //   const signer = provider.getSigner();
  const navigation = useNavigation();

  const handleConfirm = async (contractAddress, privateKey) => {
    navigation.navigate('BookingDetails');

    //   try {
    //     const signer = provider.getSigner()[0];
    //     Log.info(signer);
    //     const transaction = await contract.confirmRide();
    //     const {hash} = await signer.sendTransaction(transaction);
    //     Log.info(hash);
    //     setTxHash(hash);
    //   } catch (error) {
    //     console.log(error);
    //   }
  };
  const handleBack = () => {
    navigation.navigate('ConfirmRidePage');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../Assets/driverImage.png')}
      />
      <Text style={styles.text}>Confirm your ride with Rohit?</Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
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
});

export default SelectDriverPage;
