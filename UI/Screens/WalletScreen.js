import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logger} from 'react-native-logs';
import axios from 'axios';

const options = [
  {
    id: '1',
    name: 'John Doe',
    time: '2023-03-01T10:30:00Z',
    type: 'Ride Expense',
    amount: '15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    time: '2023-03-02T08:15:00Z',
    type: 'Ride Expense',
    amount: '12',
  },
  {
    id: '3',
    name: 'Top Up Wallet',
    time: '2023-03-03T16:45:00Z',
    type: 'Topup Wallet',
    amount: '8',
  },
  {
    id: '4',
    name: 'Emily Wong',
    time: '2023-03-04T12:00:00Z',
    type: 'Ride Expense',
    amount: '10',
  },
  {
    id: '5',
    name: 'Mike Johnson',
    time: '2023-03-05T09:00:00Z',
    type: 'Ride Expense',
    amount: '20',
  },
  {
    id: '6',
    name: 'Sara Kim',
    time: '2023-03-06T17:30:00Z',
    type: 'Ride Expense',
    amount: '16',
  },
  {
    id: '7',
    name: 'David Chen',
    time: '2023-03-07T13:45:00Z',
    type: 'Ride Expense',
    amount: '12',
  },
  {
    id: '8',
    name: 'Top Up Wallet',
    time: '2023-03-08T08:00:00Z',
    type: 'Topup Wallet',
    amount: '6',
  },
  {
    id: '9',
    name: 'Chris Taylor',
    time: '2023-03-09T11:15:00Z',
    type: 'Ride Expense',
    amount: '9',
  },
  {
    id: '10',
    name: 'Anna Martinez',
    time: '2023-03-10T14:00:00Z',
    type: 'Ride Expense',
    amount: '13',
  },
];
const renderItem = ({item}) => (
  <TouchableOpacity style={styles.option}>
    {item.type === 'Topup Wallet' ? (
      <View style={styles.optionIconContainer}>
        <Ionicons name={'wallet-outline'} size={36} color="blue" />
      </View>
    ) : (
      <View style={styles.optionIconContainer}>
        <Ionicons name={'person-circle-outline'} size={36} color="blue" />
      </View>
    )}
    <View>
      <Text style={styles.nameContainer}>{item.name}</Text>
      <Text>{item.time}</Text>
    </View>
    <View style={styles.optionArrowContainer}>
      <Text style={styles.nameContainer}>${item.amount}</Text>
      <Text>{item.type}</Text>
    </View>
  </TouchableOpacity>
);

const WalletScreen = () => {
  const Log = logger.createLogger();
  const [transactions, setTransaction] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:4000/payments/getTransactions')
      .then(response => {
        Log.info(response);
        setTransaction(response.json());
      })
      .catch(error => {
        Log.info(error);
      });
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Ionicons name={'card-outline'} size={36} color="blue" />
        <Text style={styles.header}>My E-Wallet</Text>
      </View>
      <ImageBackground
        source={require('../Assets/card-bg.jpg')}
        style={styles.cardContainer}>
        <Text style={styles.cardHeader}>Carma Cash</Text>
        <Text style={styles.cardAmount}>$14.00</Text>
        <Text style={styles.cardDetails}>Plan ahead, budget easier</Text>

        <TouchableOpacity style={styles.addCash}>
          <Text style={styles.cardDetails}>
            <Ionicons name={'add-circle'} size={16}></Ionicons>
            Add Cash
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <View>
        <Text style={styles.subHeader}>Transaction History</Text>
      </View>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 10,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    width: '100%', // alignItems: 'baseline',
    paddingVertical: 8,
    paddingHorizontal: 8, // borderBottomWidth: 1, // borderBottomColor: '#E5E5E5',
  },
  optionIconContainer: {
    width: 50,
    alignItems: 'flex-start',
  },
  optionArrowContainer: {
    alignItems: 'flex-end',
    flexGrow: 1,
  },
  nameContainer: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContainer: {
    height: 200,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 16,
    // fontWeight: 'bold',
    color: 'white',
  },
  cardAmount: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDetails: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
  },
  addCash: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
