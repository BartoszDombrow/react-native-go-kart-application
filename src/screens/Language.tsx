import React, { useState } from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MainButton from '../components/MainButton';
import SubmitButton from '../components/SubmitButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';

const colors = new Colors();
const fonts = new Fonts();

const Language = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const [pickedLanguage, setPickedLanguage] = useState(1);

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Language</Text>
      </View>
      <View style={styles.languageContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="Polish"
              iconName="flag_pl"
              onPress={() => {setPickedLanguage(1)}}
              isLanguagePicked={pickedLanguage === 1 ? true : false}
            />
          </View>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="English"
              iconName="flag_en"
              onPress={() => {setPickedLanguage(2)}}
              isLanguagePicked={pickedLanguage === 2 ? true : false}
            />
          </View>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="German"
              iconName="flag_ge"
              onPress={() => {setPickedLanguage(3)}}
              isLanguagePicked={pickedLanguage === 3 ? true : false}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <SubmitButton
          buttonText="RETURN"
          onPress={() => {
            navigation.navigate('Menu');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  headerContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primaryFont,
    fontSize: 48,
    height: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 5,
  },
  languageContainer: {
    flex: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  languageButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Language;
