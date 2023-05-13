import React, {useEffect, useState, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
const GOOGLE_MAPS_API_KEY = 'AIzaSyDqLflunQA7crh0thU23kpQqQ5edQS_U-0';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import {logger} from 'react-native-logs';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
function TripRoute() {
  const Log = logger.createLogger();
  const route = useRoute();
  const {startLocation, endLocation, startPlace, endPlace} = route.params;
  Log.info(startLocation);
  const LATITUDE_DELTA = 0.005;
  const LONGITUDE_DELTA = 0.005;
  const [initialRegion, setInitialRegion] = useState(null);
  const mapRef = useRef(null);
  const [startPin, setStartPin] = useState(null);
  const [endPin, setEndPin] = useState(null);
  const [distance, setDistance] = useState(null);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('findRide');

  useEffect(() => {
    setInitialRegion({
      latitude: startLocation.startLocLat,
      longitude: startLocation.startLocLong,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    Log.info(initialRegion);
  }, [startLocation, endLocation]);

  const onReady = result => {
    const {coordinates} = result;

    setStartPin(coordinates[0]);
    setEndPin(coordinates[coordinates.length - 1]);
    const miles = result.distance * 0.621371;
    setDistance(`${miles.toFixed(2)} miles`);

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
      animated: true,
    });
  };

  const onConfirm = () => {
    navigation.navigate('Home', {
      screen: 'ConfirmRidePage',
      params: {
        tripRoute: {
          startLocation: startLocation,
          endLocation: endLocation,
          startPlace: startPlace,
          endPlace: endPlace,
        },
      },
    });
  };

  const onOfferRideSelected = () => {
    setSelectedOption('offerRide');
  };

  const onFindRideSelected = () => {
    setSelectedOption('findRide');
  };

  const onOfferRide = () => {
    // Handle offer ride button click
    Log.info('offer ride button');
    navigation.navigate('Home', {
      screen: 'SelectCarScreen',
      params: {
        tripRoute: {
          startLocation: startLocation,
          endLocation: endLocation,
          startPlace: startPlace,
          endPlace: endPlace,
        },
      },
    });
  };

  const onFindRide = () => {
    // Handle find ride button click
    navigation.navigate('Home', {
      screen: 'ConfirmRidePage',
      params: {
        tripRoute: {
          startLocation: startLocation,
          endLocation: endLocation,
          startPlace: startPlace,
          endPlace: endPlace,
        },
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {initialRegion && (
          <MapView
            ref={mapRef}
            showsUserLocation={true}
            style={styles.map}
            initialRegion={initialRegion}>
            {startPin && <Marker coordinate={startPin} />}
            {endPin && <Marker coordinate={endPin} />}
            <MapViewDirections
              origin={{
                latitude: startLocation.startLocLat,
                longitude: startLocation.startLocLong,
              }}
              destination={{
                latitude: endLocation.endLocLat,
                longitude: endLocation.endLocLong,
              }}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={6}
              strokeColor="blue"
              optimizeWaypoints={true}
              splitWaypoints={true}
              language="en"
              unit="imperial"
              mode="DRIVING"
              avoid="ferries"
              onReady={onReady}
            />
          </MapView>
        )}
      </View>
      <View style={styles.rideConfirmation}>
        <View style={styles.distance}>
          <Text style={styles.distanceText}>Distance</Text>
          <Text>{distance}</Text>
        </View>
        <View style={styles.bookRide}>
          <View style={styles.locationContainer}>
            <Icon
              name="my-location"
              size={30}
              color="black"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{startPlace}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Icon
              name="location-pin"
              size={30}
              color="black"
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>{endPlace}</Text>
          </View>
          <View style={styles.offerFindRide}>
            <TouchableOpacity
              style={[
                styles.offerFindRideBox,
                selectedOption === 'offerRide' && styles.selectedOptionButton,
              ]}
              onPress={onOfferRideSelected}>
              <Text style={styles.offerFindRideText}>Offer Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.offerFindRideBox,
                selectedOption === 'findRide' && styles.selectedOptionButton,
              ]}
              onPress={onFindRideSelected}>
              <Text style={styles.offerFindRideText}>Find Ride</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Ride</Text>
          </TouchableOpacity> */}
          {selectedOption === 'findRide' ? (
            <TouchableOpacity style={styles.confirmButton} onPress={onFindRide}>
              <Text style={styles.confirmButtonText}>Find Ride</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onOfferRide}>
              <Text style={styles.confirmButtonText}>Offer a Ride</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

{
  /* <View style={[styles.locationContainer, {flex: 1}]}>
<View style={[styles.location, {flex: 1}]}>
  <Icon
    name="my-location"
    size={30}
    color="black"
    style={styles.icon}
  />
  <Text style={styles.locationText}>{startPlace}</Text>
</View>
<View style={[styles.location, {flex: 1}]}>
  <Icon
    name="location-pin"
    size={30}
    color="black"
    style={styles.icon}
  />
  <Text style={styles.locationText}>{endPlace}</Text>
</View>
</View>
<SafeAreaView>
<TouchableOpacity
  style={[styles.button, {flex: 0.5}]}
  onPress={onConfirm}>
  <Text style={styles.buttonText}>Confirm Ride</Text>
</TouchableOpacity>
</SafeAreaView>
</View> */
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  distance: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    height: 60,
    alignItems: 'flex-start',
  },
  distanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rideConfirmation: {
    flex: 1.4,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  bookRide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  locationIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  offerFindRide: {
    flexDirection: 'row',
    height: 100,
    marginTop: 20,
  },
  offerFindRideBox: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  selectedOptionButton: {
    backgroundColor: '#007bff',
  },
  offerFindRideText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default TripRoute;
