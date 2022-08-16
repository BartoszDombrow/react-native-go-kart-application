import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Typography from '../components/atoms/Typography';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import driversData from '../constants/DriversDATA.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DriverScreen = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.screen}>
      <View style={styles.leftContainer}>
        <View style={styles.mapContainer}>
          {driversData.map(driverData => {
            return (
              <View
                key={driverData.id}
                style={{
                  top: driverData.top,
                  left: driverData.left,
                  backgroundColor: driverData.color,
                  ...styles.driver,
                }}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.stats}>
          <Typography variant="smallTitle" style={styles.topStats}>
            {t('position', {position: 3}).toUpperCase()}
          </Typography>
          <Typography variant="smallTitle" style={styles.topStats}>
            {t('lap', {lap: 1}).toUpperCase()}
          </Typography>
          <View style={styles.iconStats}>
            <Ionicons
              name="speedometer-outline"
              size={48}
              color={colors.white}
            />
            <Typography variant="basicText" style={styles.statsText}>
              28 km/h
            </Typography>
          </View>
          <View style={styles.iconStats}>
            <MaterialIcons name="timer" size={48} color={colors.white} />
            <Typography variant="basicText" style={styles.statsText}>
              {dayjs().startOf('day').millisecond(123456).format('mm:ss:SSS')}
            </Typography>
          </View>
          <View style={styles.iconStats}>
            <FontAwesome5 name="route" size={48} color={colors.white} />
            <Typography variant="basicText" style={styles.statsText}>
              885 m
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.darkBlue,
  },
  leftContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: 250,
    height: 250,
  },
  driver: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  rightContainer: {
    flex: 1,
    paddingBottom: 16,
    justifyContent: 'space-evenly',
  },
  stats: {
    padding: 16,
  },
  topStats: {
    height: 64,
  },
  iconStats: {
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  statsText: {
    color: colors.white,
    flex: 1,
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 10,
  },
});

export default DriverScreen;
