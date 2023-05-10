import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {logger} from 'react-native-logs';
function SearchPage({navigation}) {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDqLflunQA7crh0thU23kpQqQ5edQS_U-0';
  const [startLocation, setStartLocation] = useState({
    startLocLat: 0.0,
    startLocLong: 0.0,
  });
  const [endLocation, setEndLocation] = useState({
    endLocLat: 0.0,
    endLocLong: 0.0,
  });
  const [startPlace, setStartPlace] = useState('');
  const [endPlace, setEndPlace] = useState('');
  const Log = logger.createLogger();
  const handleStartLocation = (data, details) => {
    // Log.info(details.geometry.location);
    setStartPlace(data.description);
    setStartLocation({
      startLocLat: details.geometry.location.lat,
      startLocLong: details.geometry.location.lng,
    });
  };
  const handleEndLocation = (data, details) => {
    setEndPlace(data.description);
    setEndLocation({
      endLocLat: details.geometry.location.lat,
      endLocLong: details.geometry.location.lng,
    });
  };
  const handleBackPress = () => {
    navigation.navigate('LandingPage');
  };

  useEffect(() => {
    const isStartLocSet =
      startLocation.startLocLat != 0 && startLocation.startLocLong != 0;
    const isEndLocSet =
      endLocation.endLocLat != 0 && endLocation.endLocLong != 0;
    if (isStartLocSet && isEndLocSet) {
      Log.info(startLocation);
      navigation.navigate('Home', {
        screen: 'TripRoute',
        params: {
          startLocation: startLocation,
          endLocation: endLocation,
          startPlace: startPlace,
          endPlace: endPlace,
        },
      });
    }
    // Log.info(startLocation);
  }, [startLocation, endLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lowerContainer}>
        {/* <View style={styles.selectAddressContainer}>
          <Text style={styles.selectAddressText}>Select Address</Text>
        </View> */}
        <View style={styles.inputContainer}>
          <Icon name="my-location" size={30} color="blue" style={styles.icon} />
          <GooglePlacesAutocomplete
            placeholder="From ?"
            fetchDetails={true}
            onPress={handleStartLocation}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            styles={{
              container: styles.searchContainer,
              textInput: styles.input,
              listView: styles.listViewFrom,
            }}
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
            // currentLocation={true}
            // currentLocationLabel="Current Location"
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
            onPress={handleEndLocation}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            styles={{
              container: styles.searchContainer,
              textInput: styles.input,
              listView: styles.listViewTo,
            }}
            enablePoweredByContainer={false}
            minLength={2}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    width: 50,
    height: 50,
    marginLeft: 20,
    marginTop: 50,
  },

  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  listViewTo: {
    top: 5, // Adjust this value as needed
    right: 10,
    maxHeight: 80, // Add this line to limit the max height of the list view
  },
  listViewFrom: {
    top: 75, // Adjust this value as needed
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
    flex: 1,
    backgroundColor: 'transparent',

    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  lowerContainer: {
    top: '50%',
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
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  selectAddressContainer: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    height: 65,
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
  backIcon: {
    marginLeft: 9,
  },
  renderResults: {
    backgroundColor: 'red',
  },
});
export default SearchPage;
