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
  const [scrollText, setScrollText] = useState('Sign in');

  const slideAnimation = useRef(new Animated.Value(5)).current;

  const scrollRight = () => {
    Animated.timing(slideAnimation, {
      toValue: Dimensions.get('window').width * 0.6 - 45,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const scrollLeft = () => {
    Animated.timing(slideAnimation, {
      toValue: 5,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const scrollEvent = (e: any, state: any) => {
    setScrollPosition(state.index);
    if (scrollPosition) {
      setScrollText('Sign up');
    } else {
      setScrollText('Sign in');
    }
  };

  useEffect(() => {
    if (scrollPosition) {
      scrollRight();
    } else {
      scrollLeft();
    }
  }, [scrollPosition]);

  return (
    <View style={styles.formContainer}>
      <Shadow inner useArt style={styles.switchContainer}>
        <View style={styles.switchBox}>
          <Text style={styles.switchText}>{scrollText}</Text>
        </View>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              left: slideAnimation,
            },
          ]}>
          <Shadow useArt style={styles.pickedForm} />
        </Animated.View>
      </Shadow>
      <Swiper
        style={styles.swiper}
        loop={false}
        showsPagination={false}
        onMomentumScrollEnd={scrollEvent}>
        <View style={styles.formType}>
          <LoginForm />
        </View>
        <View style={styles.formType}>
          <SignUp />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: '100%',
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
    shadowRadius: 5
  },
  switchBox: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fonts.secondaryFont,
    color: colors.white,
    zIndex: 1,
  },
  fadingContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 5,
    left: 5,
    borderRadius: 25,
  },
  pickedForm: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 4},
  },
  swiper: {
    marginTop: 20,
  },
  formType: {
    width: '100%',
  }
});

export default AuthForm;
