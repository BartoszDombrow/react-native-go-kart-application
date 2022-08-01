import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../components/button/CustomButton';
import colors from '../constants/Colors';
import Typography from '../typography/Typography';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';

const DriverProfile = ({route}: any) => {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  const {driver} = route.params;

  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.raceContainer}>
        <View
          style={{
            position: 'absolute',
            top: driver.top,
            left: driver.left,
            backgroundColor: driver.color,
            height: 20,
            width: 20,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.smallContainer}>
        <Typography variant="smallButtonText">{t('distance')}</Typography>
        <View style={styles.parametersContainer}>
          <Typography variant="basicText">{driver.distance}</Typography>
        </View>
        <Typography variant="smallButtonText">{t('speed')}</Typography>

        <View style={styles.parametersContainer}>
          <Typography variant="basicText">{driver.speed}</Typography>
        </View>
        <Typography variant="smallButtonText">{t('time')}</Typography>

        <View style={styles.parametersContainer}>
          <Typography variant="basicText">
            {dayjs(driver.time).format('mm:ss:SSS')}
          </Typography>
        </View>
      </View>
      <View style={styles.smallContainer}>
        <Typography variant="smallTitle">{driver.name}</Typography>
        <CustomButton
          buttonText={t('exit')}
          buttonVariant="tinyButton"
          onPress={() => {
            gameNavigation.navigate('GameScreen');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.mediumBlue,
  },
  smallContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    padding: 16,
  },
  raceContainer: {
    width: '50%',
    backgroundColor: colors.darkBlue,
  },
  parametersContainer: {
    backgroundColor: colors.lightBlue,
    width: 150,
    padding: 8,
    borderRadius: 20,
  },
});
export default DriverProfile;
