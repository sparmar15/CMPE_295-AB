import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  title: {
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'left',
    paddingLeft: 20,
  },

  subtitle: {
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 30,
    color: 'grey',
  },

  logo: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },

  input: {
    width: '95%',
    height: 55,
    backgroundColor: 'white', // lighter blue input background color
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },

  container: {
    backgroundColor: '#fff',
    height: '100%',
  },

  container2: {
    paddingTop: '10%',
  },

  button: {
    color: '#007AFF',
  },

  desc: {
    fontFamily: 'Georgia',
    alignSelf: 'center',
    fontSize: 16,
    padding: 20,
    color: '#7b8393',
  },

  forgot: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'left',
    paddingLeft: 20,
  },

  label: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    width: 350,
    marginLeft: 10,
    paddingLeft: 5,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 5,
    // textAlign: 'center',
  },
});
