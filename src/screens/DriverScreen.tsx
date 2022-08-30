import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Typography from '../components/atoms/Typography';
import {useTranslation} from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Participants} from '../context/ParticipantsProvider';
import {RouteProp, useRoute} from '@react-navigation/native';
import driverColors from '../constants/DriversColors';
import Sewio from '../websockets/Sewio';
import UserContext from '../context/UserProvider';
import Timer from '../components/atoms/Timer';

const MAP_X_SCALE_PLURAL = 2.8;
const MAP_Y_SCALE_PLURAL = 8;
type ParamsList = {
  DriverProfile: {
    drivers: Participants[];
  };
};

const DriverScreen = () => {
  const {t} = useTranslation();
  const {user} = useContext(UserContext);
  const route = useRoute<RouteProp<ParamsList, 'DriverProfile'>>();

  const [posX, setPosX] = useState<number>(115);
  const [posY, setPosY] = useState<number>(140);
  const [startLapTime, setStartLapTime] = useState(Date.now());
  const [running, setRunning] = useState(false);

  const [sewioTags, setSewioTags] = useState<Sewio[]>([]);
  useEffect(() => {
    for (let driver of route.params.drivers) {
      let sewioTagsArray = sewioTags;
      if (driver.tagId) {
        sewioTagsArray.push(new Sewio(driver.tagId));
        setSewioTags(sewioTagsArray);
      }
    }
  }, []);

  const getTagPosition = (event: WebSocketMessageEvent) => {
    const driverTag = sewioTags.find(
      tag =>
        tag.tagId ===
        route.params.drivers.find(driver => driver.userId === user.id)?.tagId,
    );

    const tagPosition = driverTag?.getPosition(event);

    if (driverTag) {
      setPosX(
        parseInt(
          (
            parseFloat(driverTag.positionX) *
            10 *
            MAP_X_SCALE_PLURAL
          ).toString(),
          10,
        ),
      );
      setPosY(
        parseInt(
          (
            parseFloat(driverTag.positionY) *
            10 *
            MAP_Y_SCALE_PLURAL
          ).toString(),
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

  if (sewioTags) {
    for (let tag of sewioTags) {
      tag.socket.onmessage = event => {
        getTagPosition(event);
      };
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.leftContainer}>
        <ImageBackground
          source={require('../assets/images/map.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.mapContainer}>
            {route.params.drivers.map(driverData => {
              return (
                <View
                  key={driverData.id}
                  style={{
                    top: posX,
                    left: posY,
                    backgroundColor: driverData.tagId
                      ? driverColors[parseInt(driverData.tagId, 10) - 1]
                      : driverColors[0],
                    ...styles.driver,
                  }}
                />
              );
            })}
          </View>
        </ImageBackground>
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
              <Timer startLapTime={startLapTime} isRunning={running} />
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
  image: {
    width: 250,
    height: 350,
    justifyContent: 'center',
  },
  mapContainer: {
    width: 150,
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
