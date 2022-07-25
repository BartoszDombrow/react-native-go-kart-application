import React, {useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import CustomButton from '../button/CustomButton';
import {useTranslation} from 'react-i18next';

const LanguageSelector = () => {
  const {i18n} = useTranslation();

  const [pickedLanguage, setPickedLanguage] = useState(i18n.language);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.languageButton}>
        <CustomButton
          buttonText="English"
          buttonVariant="mediumButton"
          imageSource={require('../../assets/images/flag_en.png')}
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
          imageSource={require('../../assets/images/flag_pl.png')}
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
          imageSource={require('../../assets/images/flag_de.png')}
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
          imageSource={require('../../assets/images/flag_uk.png')}
          onPress={() => {
            setPickedLanguage('uk');
            i18n.changeLanguage('uk');
          }}
          isSelected={pickedLanguage === 'uk'}
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
