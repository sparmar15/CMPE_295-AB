import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const BookingScreen = () => {
  const [activeTab, setActiveTab] = useState('Active');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="book" size={36} />
        <Text style={styles.title}>Booking</Text>
      </View>
      <View style={styles.tabs}>
        <Text
          style={[styles.tab, activeTab === 'Active' && styles.activeTab]}
          onPress={() => setActiveTab('Active')}>
          Active now
        </Text>
        <Text
          style={[styles.tab, activeTab === 'Completed' && styles.activeTab]}
          onPress={() => setActiveTab('Completed')}>
          Completed
        </Text>
        <Text
          style={[styles.tab, activeTab === 'Cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('Cancelled')}>
          Cancelled
        </Text>
      </View>
      <View style={styles.content}>
        {activeTab === 'Active' && <Text>Active bookings data goes here</Text>}
        {activeTab === 'Completed' && (
          <Text>Completed bookings data goes here</Text>
        )}
        {activeTab === 'Cancelled' && (
          <Text>Cancelled bookings data goes here</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    flex: 1,
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
    color: '#000',
  },
  activeTab: {
    color: '#007aff',
    borderBottomWidth: 2,
    borderBottomColor: '#007aff',
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default BookingScreen;
