import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Shadow} from 'react-native-neomorph-shadows';
import Colors from '../constants/Colors';

const colors = new Colors();

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
        <Text>Form</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.75} style={styles.button}>
          <Text style={styles.buttonText}>PLAY</Text>
        </TouchableOpacity>
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
    fontFamily: 'TitanOne-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -3, height: 4},
    textShadowRadius: 10,
  },
  formContainer: {
    width: '100%',
    height: '40%',
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
  buttonText: {
    color: colors.darkBlue,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'TitanOne-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10,
  },
});
