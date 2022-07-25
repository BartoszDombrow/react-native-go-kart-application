import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import CustomButton from '../button/CustomButton';
import {useTranslation} from 'react-i18next';

const LanguageSelector = () => {
  const {i18n} = useTranslation();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.languageButton}>
        <CustomButton
          buttonText="English"
          buttonVariant="mediumButton"
          imageSource={require('../../assets/images/flag_en.png')}
          onPress={() => {
            i18n.changeLanguage('en');
          }}
          isSelected={i18n.language === 'en'}
        />
      </View>
      <View style={styles.languageButton}>
        <CustomButton
          buttonText="Polski"
          buttonVariant="mediumButton"
          imageSource={require('../../assets/images/flag_pl.png')}
          onPress={() => {
            i18n.changeLanguage('pl');
          }}
          isSelected={i18n.language === 'pl'}
        />
      </View>
      <View style={styles.languageButton}>
        <CustomButton
          buttonText="Deutsch"
          buttonVariant="mediumButton"
          imageSource={require('../../assets/images/flag_de.png')}
          onPress={() => {
            i18n.changeLanguage('de');
          }}
          isSelected={i18n.language === 'de'}
        />
      </View>
      <View style={styles.languageButton}>
        <CustomButton
          buttonText="Українська"
          buttonVariant="mediumButton"
          imageSource={require('../../assets/images/flag_uk.png')}
          onPress={() => {
            i18n.changeLanguage('uk');
          }}
          isSelected={i18n.language === 'uk'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  languageButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default LanguageSelector;
