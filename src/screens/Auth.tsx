import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
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
          <Shadow useArt style={styles.dropShadow}>
            <Shadow inner useArt style={styles.innerShadow}>
              <Image
                source={require('../assets/images/racing-car.png')}
                style={styles.image}
              />
            </Shadow>
          </Shadow>
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
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 32
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
  innerShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowColor: '#000000',
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 175,
    height: 175,
  },
  dropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 175,
    height: 175,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
