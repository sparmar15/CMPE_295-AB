import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

function SearchPage({navigation}) {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDqLflunQA7crh0thU23kpQqQ5edQS_U-0';
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = text => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Icon name="arrow-back" size={30} color="blue" style={styles.icon} />
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.selectAddressContainer}>
          <Text style={styles.selectAddressText}>Select Address</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="my-location" size={30} color="blue" style={styles.icon} />
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
            fetchDetails={true}
            onPress={handleSearch}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            styles={{
              container: styles.searchContainer,
              textInput: styles.input,
              listView: styles.listView,
            }}
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="location-pin"
            size={30}
            color="blue"
            style={styles.icon}
          />
          <GooglePlacesAutocomplete
            placeholder="Where to ?"
            fetchDetails={true}
            onPress={handleSearch}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            styles={{
              container: styles.searchContainer,
              textInput: styles.input,
              listView: styles.listView,
            }}
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  listView: {
    top: 70, // Adjust this value as needed
    right: 10,
    maxHeight: 80, // Add this line to limit the max height of the list view
  },
  input: {
    height: 40,
    marginLeft: 40,
    marginTop: 6,
    backgroundColor: '#f2f2f2',
    alignItems: 'flex-start',
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  poweredContainer: {
    display: 'none',
  },
  upperContainer: {
    flex: 0.5,
    backgroundColor: 'transparent',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  lowerContainer: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 10,
    margin: 20,
    marginTop: 10,
  },
  selectAddressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    height: 75,
    alignItems: 'center',
  },
  selectAddressText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },

  icon: {
    marginRight: 10,
  },
  renderResults: {
    backgroundColor: 'red',
  },
});
export default SearchPage;
