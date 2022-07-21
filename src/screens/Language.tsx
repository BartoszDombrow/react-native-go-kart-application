import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MainButton from '../components/MainButton';
import SubmitButton from '../components/SubmitButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';
import Typography from '../typography/Typography';

const colors = new Colors();
const fonts = new Fonts();

const Language = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const {t, i18n} = useTranslation();
  const [pickedLanguage, setPickedLanguage] = useState(i18n.language);

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Typography variant='mediumTitle'>{t('language')}</Typography>
      </View>
      <View style={styles.languageContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="English"
              iconName="flag_en"
              onPress={() => {
                setPickedLanguage('en');
                i18n.changeLanguage('en');
              }}
              isLanguagePicked={pickedLanguage === 'en'}
            />
          </View>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="Polish"
              iconName="flag_pl"
              onPress={() => {
                setPickedLanguage('pl');
                i18n.changeLanguage('pl');
              }}
              isLanguagePicked={pickedLanguage === 'pl'}
            />
          </View>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="Deutsch"
              iconName="flag_de"
              onPress={() => {
                setPickedLanguage('de');
                i18n.changeLanguage('de');
              }}
              isLanguagePicked={pickedLanguage === 'de'}
            />
          </View>
          <View style={styles.languageButton}>
            <MainButton
              buttonText="Українська мова"
              iconName="flag_uk"
              onPress={() => {
                setPickedLanguage('uk');
                i18n.changeLanguage('uk');
              }}
              isLanguagePicked={pickedLanguage === 'uk'}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <SubmitButton
          buttonText={t('return')}
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
