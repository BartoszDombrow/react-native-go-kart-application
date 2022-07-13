import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import Swiper from 'react-native-swiper';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const colors = new Colors();
const fonts = new Fonts();

const AuthForm = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const slideAnimation = useRef(new Animated.Value(5)).current;

  const scrollRight = () => {
    Animated.timing(slideAnimation, {
      toValue: Dimensions.get('window').width * 0.4 - 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const scrollLeft = () => {
    Animated.timing(slideAnimation, {
      toValue: 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const scrollEvent = (e: any, state: any) => {
    setScrollPosition(state.index);
  };

  useEffect(() => {
    if (scrollPosition) {
      scrollRight();
    } else {
      scrollLeft();
    }
  });

  return (
    <View style={styles.formContainer}>
      <Shadow inner useArt style={styles.switchContainer}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              left: slideAnimation,
            },
          ]}>
          <Shadow useArt style={styles.pickedForm} />
        </Animated.View>
        <View style={styles.switchBox}>
          <Text
            style={[
              styles.switchText,
              scrollPosition ? styles.unselectedSwitch : styles.selectedSwitch,
            ]}>
            Sign in
          </Text>
        </View>
        <View style={styles.switchBox}>
          <Text
            style={[
              styles.switchText,
              scrollPosition ? styles.selectedSwitch : styles.unselectedSwitch,
            ]}>
            Sign up
          </Text>
        </View>
      </Shadow>
      <Swiper
        loop={false}
        showsPagination={false}
        onMomentumScrollEnd={scrollEvent}>
        <LoginForm />
        <SignUp />
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  switchContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    marginTop: 30,
    borderRadius: 25,
    backgroundColor: colors.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.55,
    shadowColor: '#000000',
    shadowRadius: 5,
  },
  switchBox: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.secondaryFont,
    color: colors.white,
  },
  selectedSwitch: {
    color: colors.darkBlue,
  },
  unselectedSwitch: {
    color: colors.white,
  },
  fadingContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.4,
    height: 40,
    top: 5,
    left: 5,
    borderRadius: 25,
    backgroundColor: colors.white,
    elevation: 25,
  },
  pickedForm: {
    width: Dimensions.get('window').width * 0.4,
    height: 40,
    borderRadius: 25,
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 4},
  },
});

export default AuthForm;
