import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {logger} from 'react-native-logs';
import {useNavigation, useRoute} from '@react-navigation/native';

const availableRides = [
  {
    id: 1,
    icon: 'car',
    fare: 1099,
    noOfAvailableSeats: 3,
    driver: {
      name: 'John Smith',
      profileImage: 'https://randomuser.me/api/portraits/men/29.jpg',
      carName: 'Toyota Camry',
      noOfSeats: 4,
      ratings: 3.4,
    },
    timeToArrive: '5 mins',
    distance: '0.1 mi',
  },
  {
    id: 2,
    icon: 'car',
    fare: 12500,
    noOfAvailableSeats: 2,
    driver: {
      name: 'Jane Doe',
      profileImage: 'https://randomuser.me/api/portraits/men/44.jpg',
      carName: 'Honda Civic',
      noOfSeats: 3,
      ratings: 4.3,
    },
    timeToArrive: '8 mins',
    distance: '0.5 mi',
  },
  {
    id: 3,
    icon: 'car',
    fare: 1500,
    noOfAvailableSeats: 1,
    driver: {
      name: 'Bob Johnson',
      profileImage: 'https://randomuser.me/api/portraits/men/90.jpg',
      carName: 'Ford Mustang',
      noOfSeats: 2,
      ratings: 5.0,
    },
    timeToArrive: '10 mins',
    distance: '0.8 mi',
  },
];
const RideOption = ({ride, selectedRide, setSelectedRide}) => {
  return (
    <View style={styles.rideOption}>
      <Image
        style={styles.rideImage}
        source={require('../Assets/rideCar.png')}
      />
      <Text style={styles.rideText}>{ride.driver.carName}</Text>
      <Text style={styles.fareText}>${(ride.fare / 100).toFixed(2)}</Text>
      <Text style={styles.fareText}>{ride.noOfAvailableSeats}</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => setSelectedRide(ride.id)}>
          <View style={styles.radio}>
            {selectedRide === ride.id && <View style={styles.selectedRadio} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ConfirmRidePage = () => {
  const handleBack = () => {
    navigation.navigate('Home', {
      screen: 'SearchPage',
    });
  };
  const [selectedRide, setSelectedRide] = useState(null);
  const Log = logger.createLogger();
  const navigation = useNavigation();
  const route = useRoute();
  const {tripRoute} = route.params;
  const selectedRideDetails = availableRides.find(
    option => option.id === selectedRide,
  );
  const selectDriver = () => {
    navigation.navigate('Home', {
      screen: 'SelectDriverPage',
      params: {rideDetails: selectedRideDetails, tripRoute: tripRoute},
    });
  };
  Log.info('selectedRide' + JSON.stringify(selectedRideDetails));
  return (
    <View style={styles.container}>
      {/* <View style={styles.distance}>
        <Text style={styles.distanceText}>Choose Ride</Text>
      </View> */}
      <SafeAreaView style={styles.upperContainer}>
        {/* <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="keyboard-backspace" size={30} color="black" />
        </TouchableOpacity> */}
      </SafeAreaView>
      <ScrollView style={styles.lowerContainer}>
        {/* <View style={styles.rideCards}> */}
        {availableRides.map(ride => (
          <RideOption
            key={ride.id}
            ride={ride}
            selectedRide={selectedRide}
            setSelectedRide={setSelectedRide}
          />
        ))}
        {/* </View> */}
      </ScrollView>
      <SafeAreaView style={styles.continue}>
        <TouchableOpacity style={styles.continueButton} onPress={selectDriver}>
          <Text style={styles.distanceText}>Continue</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
    // flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    paddingHorizontal: 20,
    left: 20,
  },
  backButton: {
    flex: 0.15,
  },
  distance: {
    // flex: 0,
    top: 20,
    left: 20,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lowerContainer: {
    flex: 1.5,
    overflow: 'scroll',
  },
  rideCards: {
    borderRadius: 10, // Set a value for borderRadius to create a rectangular curve
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    height: 100,
  },
  rideOption: {
    flexDirection: 'row',
    borderRadius: 10, // Set a value for borderRadius to create a rectangular curve
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rideImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },

  rideText: {
    // marginTop: 20,
    fontSize: 18,
    fontSize: 20,
    width: 150,
    paddingLeft: 20,
    // fontWeight: 'bold',
    fontFamily: 'System',
  },
  fareText: {
    // marginTop: 20,
    marginLeft: 'auto',
    fontSize: 18,
    // fontWeight: 'bold',
  },
  radioContainer: {
    // marginTop: 20,
    marginLeft: 'auto',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  selectedRadio: {
    width: 16,
    height: 16,
    borderRadius: 10,
    // borderWidth: 2,
    backgroundColor: '#000',
  },
  continue: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // top: 10,
  },
});

export default ConfirmRidePage;
