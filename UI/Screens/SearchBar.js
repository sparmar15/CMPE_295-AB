import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
const SearchBar = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Icon name="search" size={30} color="blue" style={styles.searchIcon} />
      <Text style={styles.input}>Where are you going?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,

    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    fontSize: 16,
  },
});
export default SearchBar;
