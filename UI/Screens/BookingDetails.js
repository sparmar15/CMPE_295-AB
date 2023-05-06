import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export default function BookingDetails() {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('SelectDriverPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.Maps}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/s4r49v7n5wq-117%3A2588?alt=media&token=fb80c5f5-0422-4095-9212-61445a7dd541',
        }}>
        <View style={styles.backButtonContainer}>
          <HeaderBackButton
            onPress={handleBack}
            tintColor="black"
            labelVisible={true}
          />
        </View>

        <View style={styles.Intro}>
          <View style={styles.Intro.ModalSmall}>
            <Image
              style={styles.Intro.ProfileImg}
              source={require('../Assets/driverImage.png')}
            />
            <Text style={styles.Name}>Rohit Yadav</Text>
            <Text style={styles.Rating}>4.9</Text>
            <Image
              style={styles.Star}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/fj9zgqs7w85-117%3A2700?alt=media&token=7207ff9c-8fb3-41a4-a24b-cb00f1dd53b7',
              }}
            />
          </View>
          <Text style={styles._7958SwiftVillage}>7958 Swift Village</Text>
          <Text style={styles._105WilliamStChic}>
            105 William St, Chicago, US
          </Text>
          <Image
            style={styles.Line2}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2503?alt=media&token=65586d83-60c3-47fa-8c00-9b633c4ac389',
            }}
          />
          <Image
            style={styles.Oval}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2504?alt=media&token=14c6d5de-27c1-4893-b2c4-9cb5fa641aa5',
            }}
          />
          <Image
            style={styles.Oval1}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2505?alt=media&token=3b0c0f1d-daa1-4cd1-b612-cbfa73826ff8',
            }}
          />
          <Image
            style={styles.Oval2}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2506?alt=media&token=6c1002f1-8720-48b0-a6bd-960616a100b2',
            }}
          />
          <Image
            style={styles.Line}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/3k6xd7pnqat-117%3A2714?alt=media&token=7cfd331c-c2d0-46af-8806-c35307669278',
            }}
          />

          <Image
            style={styles.CarBlackSideSilhouette}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tqz7pp2f34e-117%3A2689?alt=media&token=5761d59d-4bfc-4270-a99d-ed7e609e5f5b',
            }}
          />
          <Text style={styles.Distance}>DISTANCE</Text>
          <Text style={styles.DistanceVal}>0.2 km</Text>
          <Text style={styles.Time}>TIME</Text>
          <Text style={styles.TimeVal}>1hr 2min</Text>
          <Text style={styles.Price}>PRICE</Text>
          <Text style={styles.PriceVal}>$25</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  BookingDetails: {
    width: 375,
    height: 812,
  },
  Circle: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,1)',
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  Intro: {
    top: '40%',
    width: 343,
    height: 230,
    borderRadius: 8,
    boxSizing: 'border-box',
    backgroundColor: 'white',
    alignSelf: 'center',
    ModalSmall: {
      position: 'absolute',
      width: 343,
      height: 68,
      backgroundColor: '#F7F7F7',
    },
    ProfileImg: {
      position: 'absolute',
      width: 50,
      height: 50,
      top: '13%',
      left: '3%',
    },
  },

  Maps: {
    width: 375,
    height: 812,
  },

  Name: {
    position: 'absolute',
    width: 109,
    height: 21,
    top: '10%',
    left: '20%',
    fontFamily: 'Georgia',
    fontSize: 17,
    lineHeight: 20,

    /* identical to box height */

    color: '#242E42',
  },

  Rating: {
    position: 'absolute',
    width: 23,
    height: 18,
    top: '45%',
    left: '25%',
    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 18,

    /* identical to box height */

    color: '#C8C7CC',
  },

  Star: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: '45%',
    left: '20%',
    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 18,
  },

  Line: {
    position: 'absolute',
    width: 341.84,
    height: 2.07,
    top: '65%',
    //left: "20%",
    alignSelf: 'center',
  },

  ModalPanel: {
    width: 311,
    height: 45,
    borderRadius: 8,
    backgroundColor: 'rgba(36,46,66,1)',
  },

  _7958SwiftVillage: {
    color: 'rgba(36,46,66,1)',
    fontSize: 17,
    top: '33%',
    left: 45,
    lineHeight: 17,
    fontFamily: 'Georgia',
    fontWeight: 400,
  },

  _105WilliamStChic: {
    color: 'rgba(36,46,66,1)',
    top: '44%',
    fontSize: 17,
    left: 45,
    lineHeight: 17,
    fontFamily: 'Georgia',
    fontWeight: 400,
  },

  CarBlackSideSilhouette: {
    width: 49.86,
    height: 23.04,
    top: '60%',
    left: '5%',
  },

  Line2: {
    position: 'absolute',
    top: '40%',
    bottom: '56.43%',
    left: '7.27%',
    right: '91.86%',
    width: 3,
    height: 32,
  },

  Oval: {
    position: 'absolute',
    top: '31%',
    bottom: '75.22%',
    left: '4.65%',
    right: '89.24%',
    width: 21,
    height: 21,
  },

  Oval1: {
    position: 'absolute',
    top: '33%',
    bottom: '78.91%',
    left: '6.1%',
    right: '90.84%',
    width: 10.5,
    height: 10.5,
  },

  Oval2: {
    position: 'absolute',
    top: '50%',
    left: 17,
    width: 18.52,
    height: 24.08,
  },

  Distance: {
    position: 'absolute',
    width: 80,
    height: 16,

    top: '74%',
    left: '25%',

    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 16,

    /* identical to box height */
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '#C8C7CC',
  },

  DistanceVal: {
    position: 'absolute',
    width: 47,
    height: 18,

    top: '84%',
    left: '29%',

    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 18,

    /* identical to box height */
    textAlign: 'center',

    color: '#242E42',
  },

  Time: {
    position: 'absolute',
    width: 80,
    height: 16,

    top: '74%',
    left: '47.5%',

    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 16,

    /* identical to box height */
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '#C8C7CC',
  },

  TimeVal: {
    position: 'absolute',
    width: 70,
    height: 18,

    top: '84%',
    left: '49%',

    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 18,

    /* identical to box height */
    textAlign: 'center',

    color: '#242E42',
  },

  Price: {
    position: 'absolute',
    width: 80,
    height: 16,

    top: '74%',
    left: '70%',

    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 16,

    /* identical to box height */
    textAlign: 'center',
    textTransform: 'uppercase',

    color: '#C8C7CC',
  },

  PriceVal: {
    position: 'absolute',
    width: 70,
    height: 18,

    top: '84%',
    left: '71%',

    fontFamily: 'Georgia',
    fontSize: 15,
    lineHeight: 18,

    /* identical to box height */
    textAlign: 'center',

    color: '#242E42',
  },
});
