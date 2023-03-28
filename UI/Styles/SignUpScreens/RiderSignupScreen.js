import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  label: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'flex-start',
    width: 350,
    marginLeft: 10,
    paddingLeft: 5,
  },
  button: {
    color: '#007AFF',
    paddingBottom: '20%',
  },
  buttonText: {
    color: '#1976D2', // blue button text color
    fontSize: 18,
    fontWeight: '500',
  },
  input: {
    height: 55,
    backgroundColor: 'white', // lighter blue input background color
    color: '#000',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  after: {
    height: 20,
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
  },
  title: {
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    fontSize: 36,
    alignSelf: 'flex-start',
  },

  subtitle: {
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    fontSize: 18,
    alignSelf: 'flex-start',
    color: 'grey',
  },
  background: {
    height: '100%',
    padding: '5%',
  },
});
