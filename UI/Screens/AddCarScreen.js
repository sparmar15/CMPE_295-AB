import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ColorPicker} from 'react-native-color-picker';
import {logger} from 'react-native-logs';
import {useNavigation, useRoute} from '@react-navigation/native';

function AddCarScreen() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const Log = logger.createLogger();
  const navigation = useNavigation();
  const route = useRoute();
  const {handleAddCar} = route.params;

  useEffect(() => {
    if (make === '' || model === '' || color === '' || licensePlate === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [make, model, color, licensePlate]);

  const handleColorSelect = col => {
    setColor(col);
  };

  const onPressSave = () => {
    // Handle saving new car
    // Log.info(make, model, color, licensePlate);
    handleAddCar(make, model, color, licensePlate);
    navigation.goBack();
  };

  const colors = [
    '#000000', // black
    '#FFFFFF', // white
    '#C0C0C0', // silver
    '#FF0000', // red
    '#0000FF', // blue
  ];

  const renderColorOption = col => {
    return (
      <TouchableOpacity
        style={[styles.colorOption, color == col && styles.selectedColorOption]}
        onPress={() => handleColorSelect(col)}
        key={col}>
        <View style={[styles.colorCircle, {backgroundColor: col}]} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Make"
        value={make}
        onChangeText={text => setMake(text)}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={text => setModel(text)}
        autoCapitalize="words"
      />
      <Text style={styles.approxColorText}>Approximate color:</Text>
      <View style={styles.colorRow}>
        {colors.map(col => renderColorOption(col))}
        {color != '' && !colors.includes(color) && (
          <TouchableOpacity
            style={[styles.colorOption, styles.selectedColorOption]}
            onPress={() => handleColorSelect(color)}
            key={color}>
            <View style={[styles.colorCircle, {backgroundColor: color}]} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.customColorOption}
          onPress={() => setShowCustomColorPicker(true)}>
          <Icon name="palette" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {showCustomColorPicker && (
        <ColorPicker
          defaultColor={color}
          onColorSelected={col => {
            setColor(col);
            setShowCustomColorPicker(false);
          }}
          style={styles.colorPicker}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="License plate number"
        value={licensePlate}
        onChangeText={text => setLicensePlate(text)}
        autoCapitalize="characters"
      />
      <TouchableOpacity
        style={[styles.saveButton, disabled && styles.disabledSaveButton]}
        onPress={onPressSave}
        disabled={disabled}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  approxColorText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  colorOption: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  customColorOption: {
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  colorCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  colorPicker: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  disabledSaveButton: {
    backgroundColor: '#999',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddCarScreen;
