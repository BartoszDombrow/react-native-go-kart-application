import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GameStackParams} from '../navigation/GameNav';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import colors from '../constants/Colors';
import CustomButton from '../components/button/CustomButton';
import Typography from '../typography/Typography';
import DriversList from '../components/game/DriversList';
import {useTranslation} from 'react-i18next';

function GameScreen() {
  const navigationGame =
    useNavigation<NativeStackNavigationProp<GameStackParams>>();

  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Typography variant="smallTitle">{t('activeDrivers')}</Typography>
        <DriversList />
      </View>
      <View style={styles.content}>
        <Text>Something</Text>
      </View>
      <View style={styles.content}>
        <CustomButton
          buttonVariant="smallButton"
          buttonText={t('chooseCar')}
          onPress={() => {}}
        />
        <CustomButton
          buttonVariant="smallButton"
          buttonText={t('ready')}
          onPress={() => {}}
        />
        <CustomButton
          buttonVariant="smallButton"
          buttonText={t('start')}
          onPress={() => {}}
        />
        <CustomButton
          buttonVariant="tinyButton"
          buttonText={t('exit')}
          onPress={() => {
            navigationGame.navigate('ConnectGame');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.mediumBlue,
    justifyContent: 'center',
  },
  content: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    margin: 2,
  },
  driversListWrapper: {
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    borderRadius: 20,
    width: '90%',
    height: '70%',
    backgroundColor: colors.lightBlue,
  },
  driversList: {},
});

export default GameScreen;
