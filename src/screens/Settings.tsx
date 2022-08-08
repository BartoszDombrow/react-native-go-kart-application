import React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/Colors';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNav';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';
import Typography from '../components/atoms/Typography';
import CustomButton from '../components/atoms/CustomButton';
import {StackNavigationProp} from '@react-navigation/stack';

type SettingsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MenuStackParams>,
  StackNavigationProp<RootStackParams>
>;

const Settings = () => {
  const navigation = useNavigation<SettingsNavigationProp>();

  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
          style={styles.icon}>
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
              navigation.navigate('Profile');
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
              navigation.navigate('Language');
            }}
            iconName="language"
          />
        </View>
      </View>
      <View style={styles.submitButtonContainer}>
        <CustomButton
          buttonText={t('logout')}
          buttonVariant="bigButton"
          onPress={() => {
            navigation.navigate('Auth');
          }}
        />
      </View>
    </View>
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
