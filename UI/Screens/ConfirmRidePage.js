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
import {useNavigation} from '@react-navigation/native';

const rides = [
  {id: 1, icon: 'car', text: 'Car Ride', fare: '$10', noOfAvailableSeats: 3},
  {id: 2, icon: 'car', text: 'Car Ride', fare: '$5', noOfAvailableSeats: 4},
  {id: 3, icon: 'car', text: 'Car Ride', fare: '$0', noOfAvailableSeats: 2},
  {id: 4, icon: 'car', text: 'Car Ride', fare: '$10', noOfAvailableSeats: 5},
  {id: 5, icon: 'car', text: 'Car Ride', fare: '$5', noOfAvailableSeats: 1},
  {id: 6, icon: 'car', text: 'Car Ride', fare: '$0', noOfAvailableSeats: 2},
];

const RideOption = ({ride, selectedRide, setSelectedRide}) => {
  return (
    <View style={styles.rideOption}>
      <Image source={require('../Assets/rideCar.png')} />
      <Text style={styles.rideText}>{ride.text}</Text>
      <Text style={styles.fareText}>{ride.fare}</Text>
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
    navigation.navigate('SearchPage');
  };
  const [selectedRide, setSelectedRide] = useState(null);
  const Log = logger.createLogger();
  const navigation = useNavigation();
  const selectDriver = () => {
    navigation.navigate('Home', {
      screen: 'SelectDriverPage',
    });
  };
  Log.info('selectedRide' + selectedRide);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.upperContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="keyboard-backspace" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.distance}>
          <Text style={styles.distanceText}>Choose Ride</Text>
        </View>
      </SafeAreaView>
      <ScrollView style={styles.lowerContainer}>
        {/* <View style={styles.rideCards}> */}
        {rides.map(ride => (
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
    flex: 0.1,
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
    flex: 1,
    top: 2,
  },
  distanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System',
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
    padding: 10,
    margin: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rideText: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 18,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  fareText: {
    marginTop: 20,
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    marginTop: 20,
    marginLeft: 'auto',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  continue: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    top: 10,
  },
});

export default ConfirmRidePage;
