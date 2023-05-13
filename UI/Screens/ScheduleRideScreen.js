import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar, DateObject} from 'react-native-calendars';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {logger} from 'react-native-logs';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import SuccessPage from './SuccessPage';

function ScheduleRideScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [isoDate, setIsoDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isoTime, setIsoTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  const Log = logger.createLogger();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo.userInfo);
  const [minDate] = useState(new Date());
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    // setSelectedDate(date.toLocaleString().split('T')[0]);
    // setIsoDate(date.toLocaleString().split('T')[0]);
    //console.log(convertToLocaleTimeString(date.toISOString()));
    // console.log(localDate.split('T')[0]);

    const localISOString = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    ).toISOString();
    const dateISO = date.toISOString();

    setIsoDate(dateISO.split('T')[0]);

    setSelectedDate(localISOString.split('T')[0]);
    hideDatePicker();
    setTimeout(() => {
      Log.info(isoDate);
    }, 5000);
  };

  const convertToLocaleTimeString = isoDateString => {
    const localTime = moment.utc(isoDateString).local();
    return localTime.toISOString();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    setIsoTime(time.toISOString().split('T')[1]);
    setSelectedTime(
      time.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'}),
    );
    hideTimePicker();
  };

  const handleScheduleRide = async () => {
    // Handle scheduling the ride
    // Log.info(params, selectedDate, selectedTime);

    const tripRoute = params.tripRoute;
    const selectedCar = params.selectedCar;
    const occupants = params.occupants;
    delete selectedCar.id;
    const trip = {
      ...tripRoute,
      startDate: isoDate,
      startTime: isoTime,
      driverEmail: userInfo.email,
      driverName: userInfo.name,
      selectedCar,
      occupants,
    };
    console.log(trip);
    try {
      const res = await axios.post('http://localhost:4000/trips/', trip);
    } catch (error) {
      console.log(error);
    }
    setShowSuccessPage(true);

    // console.log(res.data);
  };

  const handleCloseSuccessPage = () => {
    setShowSuccessPage(false);
    navigation.navigate('Home', {
      screen: 'LandingPage',
    });
  };

  return (
    <View style={styles.container}>
      {!showSuccessPage ? (
        <>
          <View style={styles.calendarContainer}>
            <Calendar
              current={DateObject}
              onDayPress={day => setSelectedDate(day.dateString)}
              markedDates={{
                [selectedDate]: {selected: true, selectedColor: '#007bff'},
              }}
              style={styles.calendar}
              minDate={minDate}
            />
          </View>

          <TouchableOpacity style={styles.inputButton} onPress={showDatePicker}>
            <Text style={styles.buttonText}>
              {selectedDate ? selectedDate : 'Select Date'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputButton} onPress={showTimePicker}>
            <Text style={styles.buttonText}>
              {selectedTime ? selectedTime : 'Select Time'}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            minimumDate={minDate}
          />

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            minimumDate={minDate}
          />

          <TouchableOpacity
            style={[
              styles.scheduleButton,
              (selectedDate == '' || selectedTime == '') &&
                styles.disabledScheduleButton,
            ]}
            onPress={handleScheduleRide}
            disabled={selectedDate == '' || selectedTime == ''}>
            <Text style={styles.scheduleButtonText}>Schedule Ride</Text>
          </TouchableOpacity>
        </>
      ) : (
        <SuccessPage
          message="Ride scheduled successfully!"
          onClose={handleCloseSuccessPage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Set the background color of the screen
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarContainer: {
    marginBottom: 20,
    width: '100%', // Make the calendar container width 100%
  },
  calendar: {
    backgroundColor: '#fff', // Set the background color of the calendar
    borderRadius: 10,
  },
  inputButton: {
    backgroundColor: '#fff', // Set the background color of the input buttons
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '100%', // Stretch the input buttons to fit the width of the container
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
  },
  scheduleButton: {
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
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledScheduleButton: {
    backgroundColor: '#999',
  },
});

export default ScheduleRideScreen;
