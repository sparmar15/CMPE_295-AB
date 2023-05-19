import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';

const green = '#4cc93f';
const iconBaseSize = 20;

const SuccessAnimation = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const tipWidth = useRef(new Animated.Value(0)).current;
  const longWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(tipWidth, {
          toValue: 24,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(longWidth, {
          toValue: 40,
          duration: 140,
          useNativeDriver: false,
          delay: 300,
        }),
      ]),
    ]).start();
  }, []);

  const tipStyle = {
    width: tipWidth,
    transform: [{translateY: 35}, {translateX: 17}, {rotate: '45deg'}],
  };

  const longStyle = {
    width: longWidth,
    transform: [{translateY: 29}, {translateX: 55}, {rotate: '-45deg'}],
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.successIcon, {transform: [{scale: scaleValue}]}]}>
        <View style={[styles.tip, tipStyle]} />
        <View style={[styles.long, longStyle]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: lighten(green, 20),
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  tip: {
    height: 4,
    backgroundColor: lighten(green, 20),
    borderRadius: 10,
    position: 'absolute',
  },
  long: {
    height: 4,
    backgroundColor: lighten(green, 20),
    borderRadius: 10,
    position: 'absolute',
  },
});

function lighten(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, color =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
}

export default SuccessAnimation;
