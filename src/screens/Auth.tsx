import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import AuthForm from '../components/auth/AuthForm';
import SubmitButton from '../components/SubmitButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import MainButton from '../components/MainButton';

const colors = new Colors();
const fonts = new Fonts();

const Auth = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const {t, i18n} = useTranslation();
  const [pickedLanguage, setPickedLanguage] = useState(i18n.language);

  return (
    <>
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
            <View
              style={{
                width: '100%',
                flex: 0.2,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Shadow useArt style={styles.languageShadow}>
                <TouchableOpacity
                  style={styles.languageSettingsButton}
                  onPress={() => setIsLanguagesVisible(true)}>
                  <Icon name="language" size={30} color={colors.darkBlue} />
                </TouchableOpacity>
              </Shadow>
            </View>
            <View
              style={{
                width: '100%',
                flex: 0.8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.titleText}>Track masters</Text>
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <AuthForm />
        </View>
      </SafeAreaView>
      <Modal
        animationType="slide"
        visible={isLanguagesVisible}
        onRequestClose={() => setIsLanguagesVisible(!isLanguagesVisible)}>
        <View style={{flex: 1, backgroundColor: colors.lightBlue}}>
          <View style={styles.languageTitleContainer}>
            <Text style={styles.languageTitle}>{t('Language')}</Text>
          </View>
          <ScrollView style={styles.languageScrollView}>
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
                buttonText="Polski"
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
          <View style={styles.languageExit}>
            <SubmitButton
              buttonText={t('Exit')}
              onPress={() => setIsLanguagesVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
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
    paddingTop: 32,
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
  languageShadow: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    marginRight: 20,
    backgroundColor: colors.lightBlue,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 2},
  },
  languageSettingsButton: {
    width: 30,
    height: 30,
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
  languageTitleContainer: {
    flex: 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageTitle: {
    height: 50,
    fontFamily: fonts.primaryFont,
    color: colors.darkBlue,
    fontSize: 38,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 10,
  },
  languageScrollView: {
    flex: 0.4,
  },
  languageButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  languageExit: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
