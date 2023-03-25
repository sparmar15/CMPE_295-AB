import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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

  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center',
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
    padding: '5%',
  },
  after: {
    height: 20,
  },

  button: {
    color: '#007AFF',
  },

  desc: {
    fontFamily: 'Georgia',
    alignSelf: 'center',
    fontSize: 16,
    color: '#7b8393',
  },

  forgot: {
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'left',
  },

  label: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'flex-start',
    width: 350,
    marginLeft: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 5,
  },
});
