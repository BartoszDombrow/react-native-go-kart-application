import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import Typography from '../components/atoms/Typography';
import CustomButton from '../components/atoms/CustomButton';

const MainView = () => {
  const menuNavigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const {t} = useTranslation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            onPress={() => menuNavigation.navigate('Settings')}
            style={styles.icon}>
            <Icon name={'settings'} color={colors.darkBlue} size={50} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Typography variant="bigTitle" style={styles.headerText}>
            {t('menu')}
          </Typography>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <CustomButton
          buttonText={t('start')}
          onPress={() => menuNavigation.navigate('Start')}
          buttonVariant="mediumButton"
          iconName="play"
        />
        <CustomButton
          buttonText={t('hallOfFame')}
          onPress={() => menuNavigation.navigate('HallOfFame')}
          buttonVariant="mediumButton"
          iconName="trophy"
        />
        <CustomButton
          buttonText={t('statistics')}
          onPress={() => menuNavigation.navigate('Statistics')}
          buttonVariant="mediumButton"
          iconName="stats-chart"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
  headerContainer: {
    flex: 0.35,
    justifyContent: 'center',
  },
  settingsContainer: {
    paddingLeft: 30,
  },
  icon: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 10,
    elevation: 22,
    borderRadius: 30,
    width: 50,
  },
  titleContainer: {
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 30,
  },
  contentContainer: {
    flex: 0.55,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerText: {
    color: colors.darkBlue,
  },
});

export default MainView;
