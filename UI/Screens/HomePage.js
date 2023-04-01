import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import {useSelector} from 'react-redux';

export default function HomePage({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: 'https://www.example.com/background.png'}}
        style={styles.background}>
        <Image
          source={require('../Assets/homePageGif.gif')}
          style={styles.gif}
        />
        <Text style={styles.welcomeText}>Welcome to our App!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login as Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login as Rider</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 220,
  },
  gif: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 100,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
