import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import colors from '../constants/Colors';
import Typography from '../components/atoms/Typography';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import {useTranslation} from 'react-i18next';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

const DriverProfile = ({route}: any) => {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  const {driver} = route.params;

  const {t} = useTranslation();

  useEffect(() => {
    setSewioTag(new Sewio('8'));
  }, []);

  const getTagPosition = (event: WebSocketMessageEvent) => {
    const tagPosition = sewioTag?.getPosition(event);
    if (sewioTag) {
      setPosX(
        parseInt(
          (parseFloat(sewioTag.positionX) * 10 * MAP_X_SCALE_PLURAL).toString(),
          10,
        ),
      );
      setPosY(
        parseInt(
          (parseFloat(sewioTag.positionY) * 10 * MAP_Y_SCALE_PLURAL).toString(),
          10,
        ),
      );
    }

    if (tagPosition?.hasLeftStartArea && tagPosition?.hasStartedRace) {
      if (!running) {
        setRunning(true);
        setStartLapTime(Date.now());
      }
    } else {
      setRunning(false);
    }
  };
  // getAcceleration
  // getDistance

  if (sewioTag) {
    sewioTag.socket.onmessage = event => {
      getTagPosition(event);
    };
  }

  return (
    <View style={styles.screen}>
      <View style={styles.raceContainer}>
        <View
          style={{
            top: driver.top,
            left: driver.left,
            backgroundColor: driver.color,
            ...styles.dot,
          }}
        />
      </View>
      <View style={styles.statsContainer}>
        <View>
          <Typography variant="smallTitle">
            {route.params.driver.username}
          </Typography>
        </View>
        <View style={styles.parametersContainer}>
          <View style={styles.parametersBox}>
            <Typography variant="smallButtonText" style={styles.parameterName}>
              {t('distance')}
            </Typography>
            <Shadow useArt inner style={styles.innerShadow}>
              <Typography variant="basicText" style={{color: colors.darkBlue}}>
                {/*driver.distance}*/ `0 m`}
              </Typography>
            </Shadow>
          </View>

          <View style={styles.parametersBox}>
            <Typography variant="smallButtonText" style={styles.parameterName}>
              {t('speed')}
            </Typography>
            <Shadow useArt inner style={styles.innerShadow}>
              <Typography variant="basicText" style={{color: colors.darkBlue}}>
                {/*driver.speed}*/ `0 km/h`}
              </Typography>
            </Shadow>
          </View>

          <View style={styles.parametersBox}>
            <Typography variant="smallButtonText" style={styles.parameterName}>
              {t('time')}
            </Typography>
            <Shadow useArt inner style={styles.innerShadow}>
              <Timer startLapTime={startLapTime} isRunning={running} />
            </Shadow>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={t('exit')}
            buttonVariant="smallButton"
            onPress={() => {
              sewioTag?.socket.close();
              gameNavigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mediumBlue,
  },
  smallContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    padding: 16,
  },
  raceContainer: {
    width: 200,
    height: 250,
    margin: 32,
  },
  image: {
    width: 250,
    height: 350,
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  statsContainer: {
    flex: 1,
  },
  parametersContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  innerShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.45,
    shadowColor: '#000000',
    shadowRadius: 6,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 128,
    height: 40,
  },
  parametersBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  parameterName: {
    flex: 0.5,
  },
  buttonContainer: {
    paddingBottom: 16,
    alignItems: 'center',
  },
});
export default DriverProfile;
