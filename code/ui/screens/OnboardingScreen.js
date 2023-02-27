// https://github.com/jfilter/react-native-onboarding-swiper

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.button}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.button}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.button}>Done</Text>
  </TouchableOpacity>
);

export default OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      // onSkip={() => navigation.navigate("Login")}
      // onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.icon}
              source={require("../assets/onboarding2.jpg")}
            />
          ),
          title: <Text style={styles.title}>Locate the Destination</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              Your destination is on your fingertips
            </Text>
          ),
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.icon}
              source={require("../assets/onboarding5.jpg")}
            />
          ),
          title: <Text style={styles.title}>Select Your Ride</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              Get quick access to rides and save them as favourites
            </Text>
          ),
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.icon}
              source={require("../assets/onboarding4.jpg")}
            />
          ),
          title: <Text style={styles.title}>Share Your Ride</Text>,
          subtitle: (
            <Text style={styles.subtitle}>
              Fastest way to share a ride, share reviews and earn Karma
            </Text>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 400,
    height: 400,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    fontFamily: "Georgia",
    padding: 10,
  },
  subtitle: {
    fontWeight: "normal",
    fontSize: 14,
    fontFamily: "Georgia",
  },
  button: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
