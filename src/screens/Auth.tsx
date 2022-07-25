import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
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
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';

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
            <View style={styles.headerLanguageContainer}>
              <Shadow useArt style={styles.languageShadow}>
                <TouchableOpacity
                  style={styles.languageSettingsButton}
                  onPress={() => setIsLanguagesVisible(true)}>
                  <Icon name="language" size={30} color={colors.darkBlue} />
                </TouchableOpacity>
              </Shadow>
            </View>
            <View style={styles.headerTitleContainer}>
              <Typography variant="smallTitle" style={styles.titleText}>
                Track masters
              </Typography>
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
        <View style={styles.modalContainer}>
          <View style={styles.languageTitleContainer}>
            <Typography variant="mediumTitle" style={styles.languageTitle}>
              {t('language')}
            </Typography>
          </View>
          <ScrollView style={styles.languageScrollView}>
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
          <View style={styles.languageExit}>
            <SubmitButton
              buttonText={t('exit').toUpperCase()}
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
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  imageContainer: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
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
  image: {
    width: 100,
    height: 100,
    transform: [{rotate: '-45deg'}],
  },
  titleContainer: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerLanguageContainer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  headerTitleContainer: {
    paddingBottom: 20,
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
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  languageTitleContainer: {
    flex: 0.3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageTitle: {
    color: colors.white,
    padding: 20,
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
