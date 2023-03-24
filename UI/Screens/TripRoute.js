import React from 'react';
import {useRoute} from '@react-navigation/native';
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
function TripRoute() {
  const Log = logger.createLogger();
  const route = useRoute();
  const {startLocation, endLocation} = route.params;
  //   Log.info(route.params);
  //   Log.info(endLocation);
  return (
    // <MapView style={styles.map} region={startLocation}>
    //   <Marker coordinate={startLocation} />
    // </MapView>
    <View>
      <Text>View</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
export default TripRoute;
