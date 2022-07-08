import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';

import AuthForm from '../components/auth/AuthForm';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const colors = new Colors();
const fonts = new Fonts();

const Auth = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBackgorund}>
            <Image
              source={require('../assets/images/racing-car.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Track masters</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <AuthForm />
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  headerContainer: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    width: '45%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackgorund: {
    width: 160,
    height: 160,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    transform: [{rotate: '-45deg'}],
  },
  titleContainer: {
    width: '45%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.white,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -3, height: 4},
    textShadowRadius: 10,
  },
  formContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
