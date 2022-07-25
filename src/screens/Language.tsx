import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import SubmitButton from '../components/SubmitButton';
import colors from '../constants/Colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';
import Typography from '../typography/Typography';
import LanguageSelector from '../components/language/LanguageSelector';

const Language = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const {t} = useTranslation();

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Typography variant="mediumTitle" style={styles.title}>
          {t('language')}
        </Typography>
      </View>
      <View style={styles.languageContainer}>
        <LanguageSelector />
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
