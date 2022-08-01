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
          <TouchableOpacity onPress={settingsHandler} style={styles.icon}>
            <Icon name="close-circle" size={60} color={colors.lightBlue} />
          </TouchableOpacity>
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
                if (Platform.OS === 'ios') {
                  settingsHandler();
                  setTimeout(() => {
                    settingsNavigation.navigate('Profile');
                  }, 300);
                } else {
                  settingsNavigation.navigate('Profile');
                  setTimeout(() => {
                    settingsHandler();
                  }, 300);
                }
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
                if (Platform.OS === 'ios') {
                  settingsHandler();
                  setTimeout(() => {
                    settingsNavigation.navigate('Language');
                  }, 300);
                } else {
                  settingsNavigation.navigate('Language');
                  setTimeout(() => {
                    settingsHandler();
                  }, 300);
                }
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
  icon: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 10,
    elevation: 18,
    borderRadius: 30,
    width: 60,
  },
  buttonsContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    paddingVertical: 32,
  },
  buttonBox: {
    paddingVertical: 16,
  },
  submitButtonContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
});

export default Settings;
