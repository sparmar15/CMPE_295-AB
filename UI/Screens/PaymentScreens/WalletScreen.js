import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {logger} from 'react-native-logs';
import {useSelector} from 'react-redux';
import web3Auth from '../../../Utils/web3Auth';

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
        <Ionicons name={'wallet-outline'} size={24} color="#000" />
      </View>
    ) : (
      <View style={styles.optionIconContainer}>
        <Ionicons name={'person-circle-outline'} size={24} color="#000" />
      </View>
    )}
    <View>
      <Text style={styles.nameContainer}>{item.name}</Text>
      <Text style={styles.dateContainer}>
        {new Date(item.time).toDateString()} |{' '}
        {new Date(item.time).toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </Text>
    </View>
    <View style={styles.optionArrowContainer}>
      <Text style={styles.nameContainer}>${item.amount}</Text>
      <Text style={styles.dateContainer}>{item.type}</Text>
    </View>
  </TouchableOpacity>
);

const WalletScreen = ({navigation}) => {
  const Log = logger.createLogger();
  const [transactions, setTransaction] = useState('');
  const [balance, setBalance] = useState(0);
  const [userInfo, setUserInfo] = useState(
    useSelector(state => state.userInfo),
  );
  const {getBalance} = web3Auth();
  useEffect(() => {
    const bal = async () => {
      const info = await getBalance();
      Log.info(info);
      setBalance(parseInt(info.hex, 16));
      // Log.info(info);
    };
    bal();
    Log.info(userInfo);
    Log.info(balance);
  }, []);
  const addCash = async () => {
    // navigation.navigate('Wallet/Topup');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Ionicons name={'card-outline'} size={36} color="blue" />
        <Text style={styles.header}>My E-Wallet</Text>
      </View> */}
      <View style={styles.walletContainer}>
        <ImageBackground
          source={require('../../Assets/card-bg.jpg')}
          style={styles.cardContainer}>
          <View style={styles.cardImageContainer}>
            <View>
              <Text style={styles.cardHeader}>{userInfo.userInfo.name}</Text>
              <Text style={styles.cardName}>Username</Text>
            </View>

            <Image
              style={styles.cardLogo}
              source={require('../../Assets/icon.png')}></Image>
          </View>
          <Text style={styles.cardAmount}>{balance}</Text>
          <Text style={styles.cardDetails}>Plan ahead, budget easier</Text>
          <TouchableOpacity onPress={addCash} style={styles.addCash}>
            <Text style={styles.cardDetails}>
              <Ionicons name={'add-circle'} size={16}></Ionicons>
              Add Cash
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.line} />
        <View>
          <Text style={styles.subHeader}>Transaction History</Text>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={item => item.id}></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  walletContainer: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 8,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    // marginLeft: 8,
    marginBottom: 8,
    paddingLeft: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    marginLeft: 8,
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
    width: 40,
    alignItems: 'flex-start',
    // marginLeft: 8,
  },
  optionArrowContainer: {
    alignItems: 'flex-end',
    flexGrow: 1,
    // marginRight: 8,
  },
  nameContainer: {
    // fontWeight: 'bold',
    fontSize: 16,
  },
  cardContainer: {
    height: 200,
    marginTop: 10,
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  dateContainer: {
    fontSize: 12,
    color: 'gray',
  },
  cardHeader: {
    marginTop: 20,
    marginLeft: 20,
    // marginBottom: 10,
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
  cardLogo: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginEnd: 8,
    marginTop: 8,
  },
  cardImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    backgroundColor: '#c7c7c7',
    opacity: 50,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
});
