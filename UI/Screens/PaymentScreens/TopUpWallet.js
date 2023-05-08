import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const Item = ({item}) => {
  return (
    <View style={styles.optionsItem}>
      <Text>{item.name}</Text>
    </View>
  );
};

const itemData = [
  {
    id: 1,
    name: '$10',
  },
  {
    id: 2,
    name: '$20',
  },
  {
    id: 3,
    name: '$50',
  },
  {
    id: 4,
    name: '$100',
  },
  {
    id: 5,
    name: '$200',
  },
  {
    id: 6,
    name: '$250',
  },
  {
    id: 7,
    name: '$500',
  },
  {
    id: 8,
    name: '$750',
  },
  {
    id: 9,
    name: '$1,000',
  },
];

const TopUpWallet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subHeader}>Enter the amount of top up</Text>
      <View style={styles.walletContainer}>
        <TextInput style={styles.amountContainer}></TextInput>
        <View style={styles.line} />
        <View style={styles.optionsGrid}>
          <FlatList
            data={itemData}
            numColumns={3}
            renderItem={Item}
            keyExtractor={item => item.name}
            style={styles.flatList}
          />
        </View>
        <TouchableOpacity style={styles.continueButton}></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopUpWallet;

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
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  line: {
    height: 1,
    backgroundColor: '#c7c7c7',
    opacity: 50,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  amountContainer: {
    padding: 20,
    margin: 10,
    height: 100,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'lightblue',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
  optionsGrid: {
    flex: 3,
    marginHorizontal: 'auto',
    width: '100%',
    marginVertical: 'auto',
  },
  optionsItem: {
    flex: 1,
    maxWidth: '33%', // 100% devided by the number of rows you want
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'lightblue',
    borderWidth: 1.5,
    borderColor: 'lightblue',
    borderRadius: 15,
  },
  continueButton: {
    borderWidth: 1.5,
    borderColor: 'lightblue',
    borderRadius: 15,
    backgroundColor: 'lightblue',
    height: 50,
    marginBottom: 230,
  },
  flatList: {
    height: 200,
    flexGrow: 0,
    marginVertical: 10,
  },
});
