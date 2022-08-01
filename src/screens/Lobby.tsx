import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GameStackParams} from '../navigation/GameNav';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import colors from '../constants/Colors';
import CustomButton from '../components/button/CustomButton';
import Typography from '../typography/Typography';
import DriversList from '../components/game/DriversList';
import {useTranslation} from 'react-i18next';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import drivers from '../constants/DriversDATA.json';

function GameScreen() {
  const navigationGame =
    useNavigation<NativeStackNavigationProp<GameStackParams>>();

  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  const {t} = useTranslation();

  const driversAmount = drivers.length === 0 ? '' : ` (${drivers.length})`;

  return (
    <View style={styles.screen}>
      <View style={styles.driversContainer}>
        <Typography variant="smallTitle" style={styles.title}>
          {t('activeDrivers')}
          {driversAmount}
        </Typography>
        <DriversList />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.raceButtons}>
          <CustomButton
            buttonVariant="smallButton"
            buttonText={t('chooseCar')}
            onPress={() => {
              gameNavigation.navigate('ChooseCar');
            }}
          />
          <CustomButton
            buttonVariant="smallButton"
            buttonText={t('race')}
            onPress={() => {
              gameNavigation.navigate('Race');
            }}
          />
        </View>
        <CustomButton
          buttonVariant="smallButton"
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
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.mediumBlue,
  },
  driversContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
  },
  buttonsContainer: {
    padding: 16,
  },
  raceButtons: {
    flex: 1,
  },
});

export default GameScreen;
