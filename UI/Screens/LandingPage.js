import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  LogBox,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {logger} from 'react-native-logs';
import SearchBar from './SearchBar';
import {useSelector} from 'react-redux';

const LandingPage = ({navigation}) => {
  const Log = logger.createLogger();
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [markerLocation, setMarkerLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [isDestination, setIsDestination] = useState(false);
  const [userInfo, setUserInfo] = useState(
    useSelector(state => state.userInfo.userInfo),
  );

  const handlePress = () => {
    navigation.navigate('SearchPage');
  };
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView style={styles.map} showsUserLocation={true} region={location}>
          {/* <Marker coordinate={markerLocation} />npm ru */}
        </MapView>
      </View>
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text style={styles.welcomeText}>Welcome! {userInfo.name}</Text>
        </View>
        <View style={styles.view2}>
          <Pressable onPress={handlePress}>
            <SearchBar></SearchBar>
          </Pressable>
        </View>
        {/* <View style={styles.view3}>
          <SafeAreaView style={styles.iconContainer}>
            <TouchableOpacity>
              <Icon name="rocket" size={30} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="heart" size={30} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="user" size={30} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="envelope" size={30} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="cog" size={30} color="blue" />
            </TouchableOpacity>
          </SafeAreaView>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    // flexDirection: 'column',
  },
  googleSearch: {flex: 1, height: 50, paddingTop: 10, backgroundColor: 'red'},
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    marginLeft: 20,
    marginTop: 5,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 30,
  },
  map: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  navigator: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  view1: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  view2: {
    flex: 1,
    backgroundColor: 'white',
  },
  view3: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LandingPage;
