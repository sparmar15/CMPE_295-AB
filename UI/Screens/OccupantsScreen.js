import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

function OccupantsScreen() {
  const [occupants, setOccupants] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const {tripRoute, selectedCar} = route.params;

  const handleIncreaseOccupants = () => {
    setOccupants(occupants + 1);
  };

  const handleDecreaseOccupants = () => {
    if (occupants > 1) {
      setOccupants(occupants - 1);
    }
  };

  const handleScheduleRide = () => {
    // Handle scheduling the ride
    navigation.navigate('Home', {
      screen: 'ScheduleRideScreen',
      params: {
        tripRoute,
        selectedCar,
        occupants,
      },
    });
  };

  const handleStartRide = () => {
    // Handle starting the ride now
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How many passengers can you take?</Text>

      <View style={styles.occupantsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecreaseOccupants}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.occupantsText}>{occupants}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleIncreaseOccupants}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={handleScheduleRide}>
        <Text style={styles.scheduleButtonText}>Schedule Ride</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.startButton} onPress={handleStartRide}>
        <Text style={styles.startButtonText}>Start Your Ride Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  occupantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  occupantsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  scheduleButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 75,
    left: 20,
    right: 20,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  startButton: {
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
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OccupantsScreen;
