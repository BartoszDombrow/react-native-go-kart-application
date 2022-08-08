import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import AuthForm from './AuthForm';
import colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Typography from '../../components/atoms/Typography';
import LanguageSelector from '../../components/molecules/LanguageSelector';
import CustomButton from '../../components/atoms/CustomButton';

const SLIDE_ANIMATION_DURATION = 700;

const Auth = () => {
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const {t} = useTranslation();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('window').height * 0.4,
      duration: SLIDE_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: SLIDE_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <Animated.View
          style={{
            transform: [{translateY: slideAnim}],
            ...styles.animatedView,
          }}>
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
          <View style={styles.authForm}>
            <AuthForm
              setIsSignUpFormVisible={status => {
                if (status) {
                  slideDown();
                } else {
                  slideUp();
                }
              }}
            />
          </View>
        </Animated.View>
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
          <LanguageSelector />
          <View style={styles.languageExit}>
            <CustomButton
              buttonText={t('exit')}
              buttonVariant="bigButton"
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
  animatedView: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    flex: 0.47,
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
    flex: 0.47,
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
    height: 100,
    width: 178,
    paddingHorizontal: 5,
  },
  authForm: {
    flex: 0.6,
    paddingTop: 20,
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
  languageExit: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
