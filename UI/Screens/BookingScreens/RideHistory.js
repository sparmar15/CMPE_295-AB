import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {HeaderBackButton} from '@react-navigation/elements';

export default function RideHistory({navigation}) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [riderName, setRiderName] = useState('');

  const [rideRequested, setRideRequested] = useState(false);
  const [rideHistory, setRideHistory] = useState(false);

  const [driverEmail, setDriverEmail] = useState(false);
  const [requestedRides, setRequestedRides] = useState([]);
  const [rideHistoryData, setRideHistoryData] = useState([]);
  const [driveHistoryData, setDriveHistoryData] = useState([]);
  const userState = useSelector(state => state);
  useEffect(() => {
    if (userState.userInfo) {
      const email = userState.userInfo.userInfo.email;
      setDriverEmail(email);
      getRequestedRide();
    }
  }, [userState]);

  const handleApprove = async data => {
    // Handle approving the ride request
    const body = {
      tripId: data.trip._id,
      userEmail: data.rider.email,
    };
    try {
      await axios.post('http://localhost:4000/rideRequests/confirm/', body);
    } catch (error) {
      console.log(error);
    }
    setRequestedRides(prevRides => prevRides.filter(ride => ride !== data));
  };

  const handleReject = async data => {
    // Handle rejecting the ride request
    const body = {
      tripId: data.trip._id,
      userEmail: data.rider.email,
    };
    try {
      await axios.post('http://localhost:4000/rideRequests/reject/', body);
    } catch (error) {
      console.log(error);
    }
    setRequestedRides(prevRides => prevRides.filter(ride => ride !== data));
  };

  const handleInfo = () => {
    navigation.navigate('Bookings', {screen: 'RideInfo'});
  };

  const fetchDrivingHistory = async () => {
    const res = await axios.get(`http://localhost:4000/trips/${driverEmail}`);
    setDriveHistoryData(res.data);
  };

  const fetchRideHistories = async () => {
    const res = await axios.get(
      `http://localhost:4000/rideRequests/confirmedTrips/${driverEmail}`,
    );
    const data = res.data;

    setRideHistoryData(data);
  };

  const [histories, setHistories] = useState([
    {
      id: 1,
      name: 'History 1',
      rating: 5,
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '75',
    },
    {
      id: 2,
      name: 'History 2',
      rating: 5,
      start: '3425 Acacia Avenue',
      end: '789 Cahill Park Dr, San Jose, US',
      cost: '24',
    },
    {
      id: 3,
      name: 'History 3',
      rating: 5,
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '98',
    },
    {
      id: 3,
      name: 'History 3',
      rating: 5,
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '98',
    },
    {
      id: 3,
      name: 'History 3',
      rating: 5,
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '98',
    },
  ]);
  // [
  //   {
  //       "startLocation": {
  //           "startLocLat": 37.3639472,
  //           "startLocLong": -121.9289375
  //       },
  //       "endLocation": {
  //           "endLocLat": 37.6191671,
  //           "endLocLong": -122.3816108
  //       },
  //       "selectedCar": {
  //           "make": "Sdf",
  //           "model": "Sdf",
  //           "color": "#FFFFFF",
  //           "licensePlate": "SDF"
  //       },
  //       "_id": "645dce3e479fa44a4379c22a",
  //       "driverEmail": "kasarcsoham@gmail.com",
  //       "driverName": "Soham Kasar",
  //       "startPlace": "San Jose Mineta International Airport (SJC), Airport Boulevard, San Jose, CA, USA",
  //       "endPlace": "San Francisco International Airport (SFO), San Francisco, CA, USA",
  //       "startDate": "2023-05-13T00:00:00.000Z",
  //       "startTime": "08:15:16.502Z",
  //       "occupants": 1,
  //       "createdAt": "2023-05-12T05:27:26.110Z",
  //       "updatedAt": "2023-05-12T05:27:26.110Z",
  //       "__v": 0
  //   },

  const getRequestedRide = async () => {
    const res = await axios.get(
      `http://localhost:4000/rideRequests/requestingRides/${driverEmail}`,
    );
    const requestedData = res.data;
    // console.log('====================================');
    // console.log(requestedData);
    // console.log('====================================');
    setRequestedRides(requestedData);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          style={styles.showReqRides}
          onPress={() => {
            setRideRequested(true);
            setRideHistory(false);
            getRequestedRide();
          }}>
          <Text style={styles.buttonText}>Requested Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showReqRides}
          onPress={() => {
            setRideRequested(false);
            setRideHistory(true);
            fetchRideHistories();
            fetchDrivingHistory();
          }}>
          <Text style={styles.buttonText}>Ride History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {rideRequested ? (
          <>
            <Text style={styles.heading}>Requested Ride List</Text>
            {requestedRides &&
              requestedRides.map((data, index) => (
                <View key={index} style={styles.riderContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Rider's Name:</Text>
                    <Text style={styles.value}>{data.rider.email}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Start Location:</Text>
                    <Text style={styles.value}>{data.trip.startPlace}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>End Location:</Text>
                    <Text style={styles.value}>{data.trip.endPlace}</Text>
                  </View>
                  {/* <View style={styles.infoContainer}>
                  <Text style={styles.label}>Rating:</Text>
                  <Text style={styles.value}>{rider.rating}</Text>
                </View> */}
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => handleApprove(data)}>
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleReject(data)}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </>
        ) : (
          rideHistory && (
            <>
              <Text style={styles.heading}>Ride History</Text>
              {rideHistoryData.map((data, index) => (
                <View key={index} style={styles.riderContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Driver's Name:</Text>
                    <Text style={styles.value}>{data.driverName}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Start Location:</Text>
                    <Text style={styles.value}>{data.startPlace}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>End Location:</Text>
                    <Text style={styles.value}>{data.endPlace}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Ride Start Time:</Text>
                    <Text style={styles.value}>
                      {data.startDate.split('T')[0]}
                    </Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Ride Start Date</Text>
                    <Text style={styles.value}>
                      {data.startTime.slice(0, 5)}
                    </Text>
                  </View>
                </View>
              ))}
              <Text style={styles.heading}>Drive History</Text>
              {driveHistoryData &&
                driveHistoryData.map((data, index) => (
                  <View key={index} style={styles.riderContainer}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Start Location:</Text>
                      <Text style={styles.value}>{data.startPlace}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>End Location:</Text>
                      <Text style={styles.value}>{data.endPlace}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Ride Start Time:</Text>
                      <Text style={styles.value}>
                        {data.startDate.split('T')[0]}
                      </Text>
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Ride Start Date</Text>
                      <Text style={styles.value}>
                        {data.startTime.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                ))}
            </>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    padding: 20,
    height: 1000,
    flexDirection: 'column',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  riderContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  approveButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  rejectButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  showReqRides: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
