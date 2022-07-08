import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import LoginForm from './LoginForm';
import Swiper from 'react-native-swiper';

import Colors from '../../constants/Colors';

const colors = new Colors();

const AuthForm = () => {
  return (
    <Swiper
      style={styles.swiper}
      loop={false}
      dotColor={colors.white}
      activeDotColor={colors.darkBlue}
      dotStyle={{width: 20, height: 20, borderRadius: 20}}
      activeDotStyle={{
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: colors.white,
        borderWidth: 3,
      }}>
      <View style={styles.loginFormContainer}>
        <LoginForm />
      </View>
      <View style={styles.signupFormContainer}>
        <Text>Register</Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiper: {},
  loginFormContainer: {},
  signupFormContainer: {},
});

export default AuthForm;
