import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Button,
} from 'react-native';
import styles from '../../Styles/BookingScreens/RideInfo';
import {HeaderBackButton} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function RideInfo({navigation}) {
  // const handleBack = () => {
  //   navigation.navigate('RideHistory');
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.Maps}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/s4r49v7n5wq-117%3A2588?alt=media&token=fb80c5f5-0422-4095-9212-61445a7dd541',
        }}>
        {/* <View style={styles.backButtonContainer}>
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            tintColor="black"
            labelVisible={true}
          />
        </View> */}

        <View style={styles.Intro}>
          <View style={styles.Intro.ModalSmall}>
            <Image
              style={styles.Intro.ProfileImg}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/6cnx8xx48jp-117%3A2704?alt=media&token=b8636c84-16c5-4885-af3d-5de17c1615fd',
              }}
            />
            <Text style={styles.Name}>Rushi Sharma</Text>
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
          {/* <Button title="Confirm" titleStyle={styles.ModalPanel}>
            Confirm
          </Button> */}
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
      {/* <View style={styles.Circle} onPress={handleBack}></View> */}
      {/* </Image> */}
    </SafeAreaView>
  );
}
