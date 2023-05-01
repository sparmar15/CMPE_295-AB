import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../Styles/AddressMapScreen';

const AddressMapScreen = ({navigation}) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleOriginChange = (text) => {
    setOrigin(text);
  };

  const handleDestinationChange = (text) => {
    setDestination(text);
  };

  const handleSearch = () => {
    // Perform search or navigation with origin and destination values
    // e.g. call an API to get directions or show navigation on map
    console.log('Origin:', origin);
    console.log('Destination:', destination);
    navigation.navigate('DriverRiderSelect');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Display markers for origin and destination */}
        {origin && (
          <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Origin" />
        )}
        {destination && (
          <Marker coordinate={{ latitude: 37.785834, longitude: -122.406417 }} title="Destination" />
        )}
      </MapView>
      <View style={styles.formContainer}>
        {/* Form inputs for origin and destination */}
        <TextInput
          style={styles.input}
          placeholder="Enter origin"
          value={origin}
          onChangeText={handleOriginChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={handleDestinationChange}
        />
        {/* Search button */}
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressMapScreen;

