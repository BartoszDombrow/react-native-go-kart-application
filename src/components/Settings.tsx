import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/StackNav';
import {MenuStackParams} from '../navigation/MenuNav';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {useTranslation} from 'react-i18next';
import Typography from '../typography/Typography';
import CustomButton from './button/CustomButton';

interface Props {
  isVisible: boolean;
  settingsHandler: () => void;
}

const Settings: React.FC<Props> = ({isVisible, settingsHandler}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const settingsNavigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const {t} = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={settingsHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.closeButtonContainer}>
          <Shadow useArt style={styles.shadow}>
            <TouchableOpacity onPress={settingsHandler}>
              <Icon name="close-circle" size={60} color={colors.lightBlue} />
            </TouchableOpacity>
          </Shadow>
        </View>
        <View style={styles.buttonsContainer}>
          <Typography variant="mediumTitle" style={styles.title}>
            {t('settings')}
          </Typography>
          <View style={styles.buttonBox}>
            <CustomButton
              buttonText={t('profile')}
              buttonVariant="mediumButton"
              onPress={() => {
                settingsNavigation.navigate('Profile');
                setTimeout(() => {
                  settingsHandler();
                }, 250);
              }}
              iconName={
                Platform.OS === 'ios' ? 'ios-person-sharp' : 'md-person-sharp'
              }
            />
          </View>
          <View style={styles.buttonBox}>
            <CustomButton
              buttonText={t('volume')}
              buttonVariant="mediumButton"
              onPress={() => {}}
              iconName="volume-high"
            />
          </View>
          <View style={styles.buttonBox}>
            <CustomButton
              buttonText={t('language')}
              buttonVariant="mediumButton"
              onPress={() => {
                settingsNavigation.navigate('Language');
                setTimeout(() => {
                  settingsHandler();
                }, 250);
              }}
              iconName="language"
            />
          </View>
        </View>
        <View style={styles.submitButtonContainer}>
          <CustomButton
            buttonText={t('logout').toUpperCase()}
            buttonVariant="bigButton"
            onPress={() => {
              navigation.navigate('Auth');
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  closeButtonContainer: {
    paddingTop: 30,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  shadow: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    alignItems: 'center',
    flex: 0.9,
  },
  title: {
    paddingVertical: 40,
  },
  buttonBox: {
    paddingVertical: 20,
  },
  submitButtonContainer: {
    alignItems: 'center',
  },
});

export default Settings;
