import {View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from '../Styles/RideHistory';
import {HeaderBackButton} from '@react-navigation/elements';

export default function RideHistory({navigation}) {
  //const histories = ['History 1', 'History 2', 'History 3'];

  const handleInfo = () => {
    navigation.navigate('RideInfo');
  };

  const [histories, setHistories] = useState([
    {
      id: 1,
      name: 'History 1',
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '75',
    },
    {
      id: 2,
      name: 'History 2',
      start: '3425 Acacia Avenue',
      end: '789 Cahill Park Dr, San Jose, US',
      cost: '24',
    },
    {
      id: 3,
      name: 'History 3',
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '98',
    },
    {
      id: 3,
      name: 'History 3',
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '98',
    },
    {
      id: 3,
      name: 'History 3',
      start: '7958 Swift Village',
      end: '105 William St, Chicago, US',
      cost: '98',
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.backButtonContainer}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="white"
          labelVisible={true}
        />
      </View>
      
      <Text style={styles.title} tintColor="white" labelVisible={true}>
          History
        </Text>

      <View style={styles.container2}>
        {/* {histories.map((history, index) => (
        <View key={index}>
          <Text>{item}</Text>
        </View>
      ))} */}
      <ScrollView>
        {histories.map(history => (
          
          <View style={styles.History1}>
            <View key={history.id} style={styles.Group6310}>
              <Text style={styles._7958SwiftVillage}>{history.start}</Text>
              <Text style={styles._105WilliamStChic}>{history.end}</Text>
              {/* {collection.items.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))} */}
            </View>
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
            <View style={styles.Group166}>
              <Image
                style={styles.Line}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2509?alt=media&token=8e0cb713-28da-425a-babb-5b76f82edd6e',
                }}
              />

              <View style={styles.Group263}>
                <Image
                  style={styles.IconsMoney1}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2498?alt=media&token=c332e3db-f2a5-4e0d-af44-c7bf1b7a13af',
                  }}
                />
                <Text style={styles._7500}>${history.cost}</Text>
                <TouchableOpacity style={styles.Group263} onPress={handleInfo}>
                <Text style={styles.Confirm}>More Info</Text>
                <Image
                  style={styles.IconsArrowLeft}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/48ygcq1o2ts-104%3A2500?alt=media&token=65e83a37-c06e-4c9f-99ec-f77933123248',
                  }}
                />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}   
        </ScrollView>     
      </View>
    </SafeAreaView>
  );
}
