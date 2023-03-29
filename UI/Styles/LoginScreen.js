import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20, // Add padding to the sides to fill empty spaces
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50, // Move the logo up
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  descriptionText: {
    fontSize: 22,
    alignSelf: 'flex-start',
    marginBottom: 40,
    lineHeight: 24, // Increase the line height to create space between lines
  },
  signupText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 40,
    lineHeight: 24, // Increase the line height to create space between lines
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  googleSignInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
