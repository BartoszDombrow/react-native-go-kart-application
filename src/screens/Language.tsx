import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import SubmitButton from '../components/SubmitButton';
import Colors from '../constants/Colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';
import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';

const colors = new Colors();

const Language = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const {t, i18n} = useTranslation();
  const [pickedLanguage, setPickedLanguage] = useState(i18n.language);

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Typography variant="mediumTitle" style={styles.title}>
          {t('language')}
        </Typography>
      </View>
      <View style={styles.languageContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.languageButton}>
            <CustomButton
              buttonText="English"
              buttonVariant="mediumButton"
              imageSource={require('../assets/images/flag_en.png')}
              onPress={() => {
                setPickedLanguage('en');
                i18n.changeLanguage('en');
              }}
              isSelected={pickedLanguage === 'en'}
            />
          </View>
          <View style={styles.languageButton}>
            <CustomButton
              buttonText="Polski"
              buttonVariant="mediumButton"
              imageSource={require('../assets/images/flag_pl.png')}
              onPress={() => {
                setPickedLanguage('pl');
                i18n.changeLanguage('pl');
              }}
              isSelected={pickedLanguage === 'pl'}
            />
          </View>
          <View style={styles.languageButton}>
            <CustomButton
              buttonText="Deutsch"
              buttonVariant="mediumButton"
              imageSource={require('../assets/images/flag_de.png')}
              onPress={() => {
                setPickedLanguage('de');
                i18n.changeLanguage('de');
              }}
              isSelected={pickedLanguage === 'de'}
            />
          </View>
          <View style={styles.languageButton}>
            <CustomButton
              buttonText="Українська"
              buttonVariant="mediumButton"
              imageSource={require('../assets/images/flag_uk.png')}
              onPress={() => {
                setPickedLanguage('uk');
                i18n.changeLanguage('uk');
              }}
              isSelected={pickedLanguage === 'uk'}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <SubmitButton
          buttonText={t('return').toUpperCase()}
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
    padding: 20,
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
