import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import colors from '../constants/Colors';
import Typography from '../components/atoms/Typography';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import Sewio from '../websockets/Sewio';

const MAP_X_SCALE_PLURAL = 2.8;
const MAP_Y_SCALE_PLURAL = 8;

const sewio = new Sewio('8');

const DriverProfile = ({route}: any) => {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  const {driver} = route.params;

  const [posX, setPosX] = useState(115);
  const [posY, setPosY] = useState(115);
  const {t} = useTranslation();

  const getTagPosition = (event: WebSocketMessageEvent) => {
    sewio.getPosition(event);
    setPosX(
      parseInt(
        (parseFloat(sewio.positionX) * 10 * MAP_X_SCALE_PLURAL).toString(),
        10,
      ),
    );
    setPosY(
      parseInt(
        (parseFloat(sewio.positionY) * 10 * MAP_Y_SCALE_PLURAL).toString(),
        10,
      ),
    );
  };

  // getLapTime
  // getAcceleration
  // getDistance

  sewio.socket.onmessage = event => {
    getTagPosition(event);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.raceContainer}>
        <View
          style={{
            top: posY,
            left: posX,
            backgroundColor: driver.color,
            ...styles.dot,
          }}
        />
      </View>
      <View style={styles.statsContainer}>
        <View>
          <Typography variant="smallTitle">{driver.name}</Typography>
        </View>
        <View style={styles.parametersContainer}>
          <View style={styles.parametersBox}>
            <Typography variant="smallButtonText" style={styles.parameterName}>
              {t('distance')}
            </Typography>
            <Shadow useArt inner style={styles.innerShadow}>
              <Typography variant="basicText" style={{color: colors.darkBlue}}>
                {driver.distance}
              </Typography>
            </Shadow>
          </View>

          <View style={styles.parametersBox}>
            <Typography variant="smallButtonText" style={styles.parameterName}>
              {t('speed')}
            </Typography>
            <Shadow useArt inner style={styles.innerShadow}>
              <Typography variant="basicText" style={{color: colors.darkBlue}}>
                {driver.speed}
              </Typography>
            </Shadow>
          </View>

          <View style={styles.parametersBox}>
            <Typography variant="smallButtonText" style={styles.parameterName}>
              {t('time')}
            </Typography>
            <Shadow useArt inner style={styles.innerShadow}>
              <Typography variant="basicText" style={{color: colors.darkBlue}}>
                {dayjs()
                  .startOf('day')
                  .millisecond(driver.time)
                  .format('mm:ss:SSS')}
              </Typography>
            </Shadow>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={t('exit')}
            buttonVariant="smallButton"
            onPress={() => {
              sewio.socket.close();
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
    width: 250,
    height: 300,
    margin: 32,
    backgroundColor: colors.darkBlue,
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
    paddingHorizontal: 32,
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
