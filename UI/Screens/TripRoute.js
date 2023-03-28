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
              unit="metric"
              mode="driving"
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
          <View style={[styles.locationContainer, {flex: 1}]}>
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
            <TouchableOpacity style={[styles.button, {flex: 0.5}]}>
              <Text style={styles.buttonText}>Confirm Ride</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  distance: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    height: 75,
    alignItems: 'flex-start',
  },
  distanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  rideConfirmation: {
    flex: 0.75,
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
    flex: 1,
    marginBottom: 10,
    backgroundColor: 'red',
    width: '70%',
    marginBottom: 60,
    height: '50%',
  },
  icon: {
    marginLeft: 10,
    flex: 0.35,
    marginTop: 10,
  },
  location: {
    flex: 0.25,
    borderRadius: 25,
    borderWidth: 1,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    // alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 20,
  },
  locationText: {
    flex: 1.75,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 12,
  },
  button: {
    // flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default TripRoute;
