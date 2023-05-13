import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SelectCarScreen() {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const route = useRoute();
  const {tripRoute} = route.params;

  const myCars = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Corolla',
      year: '2019',
      licensePlate: 'ABC123',
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Accord',
      year: '2020',
      licensePlate: 'DEF456',
    },
    {
      id: '3',
      make: 'Tesla',
      model: 'Model S',
      year: '2021',
      licensePlate: 'GHI789',
    },
  ];

  const renderCar = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.carItem,
          selectedCar?.id === item.id && styles.selectedCarItem,
        ]}
        onPress={() => setSelectedCar(item)}>
        <Icon name="directions-car" size={24} color="#333" />
        <View style={styles.carDetails}>
          <View>
            <Text style={styles.carMake}>{item.make}</Text>
            <Text style={styles.carModel}>{item.model}</Text>
          </View>

          <Text style={styles.licensePlate}>{item.licensePlate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onPressAddCar = () => {
    // Handle adding new car
    navigation.navigate('Home', {
      screen: 'AddCarScreen',
      params: {
        handleAddCar: handleAddCar,
      },
    });
  };

  const handleAddCar = (make, model, color, licensePlate) => {
    const newCar = {
      id: String(cars.length + 1),
      make,
      model,
      color,
      licensePlate,
    };
    setSelectedCar(newCar);
    setCars([...cars, newCar]);
  };

  const onPressContinue = () => {
    // Handle continuing to next screen
    if (selectedCar) {
      //   navigation.navigate('TripRoute', {car: selectedCar});
      navigation.navigate('Home', {
        screen: 'OccupantsScreen',
        params: {
          tripRoute,
          selectedCar,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What car are you driving today?</Text>
      {cars.length > 0 ? (
        <FlatList
          data={cars}
          renderItem={renderCar}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noCars}>No cars added</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={onPressAddCar}>
        <Text style={styles.addButtonText}>Add new car</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedCar && styles.disabledContinueButton,
        ]}
        onPress={onPressContinue}
        disabled={!selectedCar}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  list: {
    width: '100%',
    marginBottom: 20,
  },
  carItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    alignItems: 'center',
  },
  selectedCarItem: {
    backgroundColor: '#e6e6e6',
  },
  carDetails: {
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
  licensePlate: {
    fontSize: 18,
    color: '#777',
    marginRight: 20,
  },
  noCars: {
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // opacity: selectedCar ? 1 : 0.5,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledContinueButton: {
    backgroundColor: '#999',
  },
});

export default SelectCarScreen;
