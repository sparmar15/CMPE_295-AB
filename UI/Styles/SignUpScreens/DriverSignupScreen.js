import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    width: 350,
    marginLeft: 10,
  },
  button: {
    width: 350,
    height: 55,
    backgroundColor: '#FFFF', // white button background color
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#1976D2', // blue button text color
    fontSize: 18,
    fontWeight: '500',
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#FFFFFF', // lighter blue input background color
    margin: 10,
    padding: 8,
    color: '#000000',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  error: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'left',
    width: 350,
    marginLeft: 10,
    marginTop: 5,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingTop: 50,
  },
});
