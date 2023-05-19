import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {logger} from 'react-native-logs';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';

const RideOption = ({ride, selectedRide, setSelectedRide}) => {
  return (
    <View style={styles.rideOption}>
      <Image
        style={styles.rideImage}
        source={require('../Assets/rideCar.png')}
      />
      <Text style={styles.rideText}>
        {ride.selectedCar.make} {ride.selectedCar.model}
      </Text>
      {/* <Text style={styles.fareText}>${(ride.fare / 100).toFixed(2)}</Text> */}
      <Text style={styles.fareText}>{ride.occupants}</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => setSelectedRide(ride._id)}>
          <View style={styles.radio}>
            {selectedRide === ride._id && <View style={styles.selectedRadio} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const rides = [
  {
    id: '1',
    carMake: 'Toyota',
    carModel: 'Corolla',
    driverName: 'John Doe',
  },
  {
    id: '2',
    carMake: 'Honda',
    carModel: 'Accord',
    driverName: 'Jane Smith',
  },
  // Add more rides here...
];

const ConfirmRidePage = () => {
  const route = useRoute();
  const [availableRides, setAvailableRides] = useState('');
  const {tripRoute} = route.params;
  const now = new Date();
  useEffect(() => {
    const getAvailbaleRides = async () => {
      const res = await axios.get(
        'http://localhost:4000/trips/getAvailableRides/',
      );
      if (res) {
        console.log(tripRoute.startLocation);
        const riderStartLocation = tripRoute.startLocation;
        const riderEndLocation = tripRoute.endLocation;
        const filteredRides = res.data.filter(ride => {
          const rideDate = new Date(
            ride.startDate.split('T')[0] + 'T' + ride.startTime,
          );
          const timeDiff = Math.abs(rideDate - now) / (1000 * 60); // time difference in minutes

          return timeDiff < 30;
        });
        // console.log('filtered', filteredRides);
        const filterTripsByDistance = (
          trips,
          riderStartLocation,
          riderEndLocation,
          maxDistance,
        ) => {
          return trips.filter(trip => {
            const startDistance = calculateDistance(
              riderStartLocation.startLocLat,
              riderStartLocation.startLocLong,
              trip.startLocation.startLocLat,
              trip.startLocation.startLocLong,
            );
            const endDistance = calculateDistance(
              riderEndLocation.endLocLat,
              riderEndLocation.endLocLong,
              trip.endLocation.endLocLat,
              trip.endLocation.endLocLong,
            );
            console.log(startDistance, endDistance);
            return startDistance <= maxDistance && endDistance <= maxDistance;
          });
        };

        const availableFilteredRides = filterTripsByDistance(
          filteredRides,
          riderStartLocation,
          riderEndLocation,
          5,
        );
        console.log('availableFilteredRides', availableFilteredRides);
        setAvailableRides(availableFilteredRides);
        function calculateDistance(lat1, lon1, lat2, lon2) {
          var R = 3961; // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          return d;
        }

        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }
      }
    };
    getAvailbaleRides();
  }, []);

  // const distance = (lat1, lon1, lat2, lon2) => {
  //   const start = {latitude: lat1, longitude: lon1};
  //   const end = {latitude: lat2, longitude: lon2};
  //   const options = {unit: 'mile'}; // You can also use 'mile' or 'kilometer'
  //   return haversine(start, end, options);
  // };
  // const handleBack = () => {
  //   navigation.navigate('Home', {
  //     screen: 'SearchPage',
  //   });
  // };
  const [selectedRide, setSelectedRide] = useState(null);
  // const Log = logger.createLogger();
  // const navigation = useNavigation();

  // const selectedRideDetails = availableRides.find(
  //   option => option.id === selectedRide,
  // );
  // const selectDriver = () => {
  //   navigation.navigate('Home', {
  //     screen: 'SelectDriverPage',
  //     params: {rideDetails: selectedRideDetails, tripRoute: tripRoute},
  //   });
  // };
  // Log.info('selectedRide' + JSON.stringify(selectedRideDetails));

  const userState = useSelector(state => state);
  const navigation = useNavigation();
  const handleRequestRide = async () => {
    // Handle request ride

    const userEmail = userState.userInfo.userInfo.email;
    const userName = userState.userInfo.userInfo.name;

    if (selectedRide) {
      // Proceed with the ride request
      console.log('====================================');
      console.log(selectedRide);
      console.log(tripRoute);
      console.log('====================================');
      const body = {
        tripId: selectedRide._id,
        userEmail: userEmail,
        userName: userName,
      };
      await axios.post('http://localhost:4000/rideRequests/', body);
      navigation.navigate('Home', {
        screen: 'SelectDriverPage',
        params: {
          rideDetails: selectedRide,
          tripRoute: tripRoute,
          userEmail: userEmail,
        },
      });
    }
  };
  const renderRideItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.rideItem,
        selectedRide?._id == item._id && styles.selectedRideItem,
      ]}
      onPress={() => setSelectedRide(item)}>
      <Icon name="directions-car" size={24} color="#333" />
      <View style={styles.rideDetails}>
        <View>
          <Text style={styles.carMake}>{item.selectedCar.make}</Text>
          <Text style={styles.carModel}>{item.selectedCar.model}</Text>
        </View>
        <View>
          <Text style={styles.driverName}>{item.driverName}</Text>
          <Text style={styles.licensePlate}>Ratings 4.3 / 5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // [
  //   {
  //     __v: 0,
  //     _id: '645dce3e479fa44a4379c22a',
  //     createdAt: '2023-05-12T05:27:26.110Z',
  //     driverEmail: 'kasarcsoham@gmail.com',
  //     driverName: 'Soham Kasar',
  //     endLocation: {endLocLat: 37.6191671, endLocLong: -122.3816108},
  //     endPlace:
  //       'San Francisco International Airport (SFO), San Francisco, CA, USA',
  //     occupants: 1,
  //     selectedCar: {
  //       color: '#FFFFFF',
  //       licensePlate: 'SDF',
  //       make: 'Sdf',
  //       model: 'Sdf',
  //     },
  //     startDate: '2023-05-13T00:00:00.000Z',
  //     startLocation: {startLocLat: 37.3639472, startLocLong: -121.9289375},
  //     startPlace:
  //       'San Jose Mineta International Airport (SJC), Airport Boulevard, San Jose, CA, USA',
  //     startTime: '05:20:16.502Z',
  //     updatedAt: '2023-05-12T05:27:26.110Z',
  //   },
  // ];
  return (
    <View style={styles.container}>
      {availableRides.length > 0 ? (
        <FlatList
          data={availableRides}
          renderItem={renderRideItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noRidesText}>Currently no rides available</Text>
      )}
      <TouchableOpacity
        style={[
          styles.requestRideButton,
          !selectedRide && styles.disabledRequestRideButton,
        ]}
        onPress={handleRequestRide}
        disabled={!selectedRide}>
        <Text style={styles.requestRideButtonText}>Request Ride</Text>
      </TouchableOpacity>
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   upperContainer: {
//     // flex: 0.1,
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     // justifyContent: 'center',
//     paddingHorizontal: 20,
//     left: 20,
//   },
//   backButton: {
//     flex: 0.15,
//   },
//   distance: {
//     // flex: 0,
//     top: 20,
//     left: 20,
//   },
//   distanceText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   lowerContainer: {
//     flex: 1.5,
//     overflow: 'scroll',
//   },
//   rideCards: {
//     borderRadius: 10, // Set a value for borderRadius to create a rectangular curve
//     backgroundColor: 'white',
//     padding: 10,
//     margin: 10,
//     height: 100,
//   },
//   rideOption: {
//     flexDirection: 'row',
//     borderRadius: 10, // Set a value for borderRadius to create a rectangular curve
//     backgroundColor: 'white',
//     padding: 20,
//     margin: 10,
//     alignItems: 'center',
//     height: 100,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   rideImage: {
//     height: 50,
//     width: 50,
//     alignSelf: 'center',
//   },

//   rideText: {
//     // marginTop: 20,
//     fontSize: 18,
//     fontSize: 20,
//     width: 150,
//     paddingLeft: 20,
//     // fontWeight: 'bold',
//     fontFamily: 'System',
//   },
//   fareText: {
//     // marginTop: 20,
//     marginLeft: 'auto',
//     fontSize: 18,
//     // fontWeight: 'bold',
//   },
//   radioContainer: {
//     // marginTop: 20,
//     marginLeft: 'auto',
//   },
//   radio: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#000',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   selectedRadio: {
//     width: 16,
//     height: 16,
//     borderRadius: 10,
//     // borderWidth: 2,
//     backgroundColor: '#000',
//   },
//   continue: {
//     flex: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   continueButton: {
//     backgroundColor: '#4285F4',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     // top: 10,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    marginBottom: 20,
  },
  rideItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    alignItems: 'center',
    height: 80,
  },
  selectedRideItem: {
    backgroundColor: '#e6e6e6',
  },
  iconContainer: {
    marginRight: 10,
  },
  carIcon: {
    width: 24,
    height: 24,
  },
  rideDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carMake: {
    fontSize: 20,
    marginLeft: 20,
  },
  carModel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  driverName: {
    fontSize: 18,
    marginRight: 10,
  },
  noRidesText: {
    fontSize: 16,
    marginBottom: 20,
  },
  requestRideButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  disabledRequestRideButton: {
    opacity: 0.5,
  },
  requestRideButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConfirmRidePage;
