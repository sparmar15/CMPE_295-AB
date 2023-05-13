import React, {useEffect, useState, useRef} from 'react';
import {Linking} from 'react-native';
const GOOGLE_MAPS_API_KEY = 'AIzaSyDqLflunQA7crh0thU23kpQqQ5edQS_U-0';
import {Text, View, Image, StyleSheet} from 'react-native';
import {logger} from 'react-native-logs';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRoute, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function TripRoute() {
  const Log = logger.createLogger();
  const route = useRoute();

  const {rideDetails, tripRoute} = route.params;
  const startLocation = tripRoute.startLocation;
  const endLocation = tripRoute.endLocation;
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
  const navigation = useNavigation();
  const handleCancel = () => {
    navigation.navigate('Home', {
      screen: 'ConfirmRidePage',
      params: {rideDetails: rideDetails, tripRoute: tripRoute},
    });
  };
  const makeCall = () => {
    // const phoneNumber = '0123456789';
    // Linking.openURL(`tel:${phoneNumber}`);
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
          <Text style={styles.distanceText}>Driver is Arriving...</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={{uri: rideDetails.driver.profileImage}}
              style={styles.profilePicture}
            />
            <Text style={styles.name}>{rideDetails.driver.name}</Text>
            <Text style={styles.rating}>4.3 ⭐️</Text>
          </View>
          <View style={styles.carDetailsContainer}>
            <Text
              style={
                styles.carDetails
              }>{`${'Tesla'} ${'Model S'} - ${'Red'}`}</Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconBorder} onPress={makeCall}>
            <Icon name="phone" size={40} color={'green'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="message" size={40} color={'blue'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Icon name="cancel" size={40} color={'red'} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  BookingDetails: {
    width: 375,
    height: 812,
  },
  Circle: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,1)',
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  Intro: {
    top: '40%',
    width: 343,
    height: 230,
    borderRadius: 8,
    boxSizing: 'border-box',
    backgroundColor: 'white',
    alignSelf: 'center',
    ModalSmall: {
      position: 'absolute',
      width: 343,
      height: 68,
      backgroundColor: '#F7F7F7',
    },
    ProfileImg: {
      position: 'absolute',
      width: 50,
      height: 50,
      top: '13%',
      left: '3%',
    },
  },

  Maps: {
    width: '100%',
    height: 812,
  },

  Name: {
    position: 'absolute',
    width: 109,
    height: 21,
    top: '10%',
    left: '20%',
    fontFamily: 'Georgia',
    fontSize: 17,
    lineHeight: 20,

    /* identical to box height */

    color: '#242E42',
  },

  Rating: {
    position: 'absolute',
    width: 23,
    height: 18,
    top: '45%',
    left: '25%',
    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 18,

    /* identical to box height */

    color: '#C8C7CC',
  },

  Star: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: '45%',
    left: '20%',
  },

  Line: {
    position: 'absolute',
    width: 341.84,
    height: 2.07,
    top: '65%',
    //left: "20%",
    alignSelf: 'center',
  },

  ModalPanel: {
    width: 311,
    height: 45,
    alignItems: 'flex-start',
  },
  distanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rideConfirmation: {
    flex: 0.35,
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
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carDetails: {
    fontSize: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 75,
    marginBottom: 20,
  },
  locationIcon: {
    marginRight: 10,
    fontSize: 20,
    color: '#000',
  },

  BookingDetails: {
    marginTop: 4,
    alignItems: 'center',
  },
  driverDetails: {
    flexDirection: 'row',
    margin: 20,
  },
  driverName: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  rating: {
    color: '#999',
    fontSize: 16,
  },
  carDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  carMake: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  carModel: {
    fontSize: 14,
    marginBottom: 4,
  },
  carColor: {
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
  },

  icon: {
    marginLeft: 70,
  },
});
export default TripRoute;
