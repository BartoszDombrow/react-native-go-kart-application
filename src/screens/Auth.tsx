import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import SignUp from '../components/SignUp/SignUp';

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
        <SignUp />
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
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '5%',
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
  buttonContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 80,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
