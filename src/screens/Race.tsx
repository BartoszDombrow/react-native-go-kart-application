import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import DriversList from '../components/organisms/DriversList';
import {Participants} from '../context/ParticipantsProvider';

type ParamsList = {
  Race: {
    drivers: Participants[];
  };
};

const COLORS = [
  'red',
  'brown',
  'green',
  'yellow',
  'pink',
  'purple',
  'blue',
  'black',
];

function Game() {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  const route = useRoute<RouteProp<ParamsList, 'Race'>>();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/map.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.map}>
          {route.params.drivers.map(driverData => {
            return (
              <View
                key={driverData.id}
                style={{
                  top: 115,
                  left: 115,
                  backgroundColor: driverData.tagId
                    ? COLORS[parseInt(driverData.tagId) - 1]
                    : COLORS[0],
                  ...styles.driver,
                }}
              />
            );
          })}
        </View>
      </ImageBackground>
      <View style={styles.players}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => gameNavigation.navigate('Lobby')}
            style={styles.closeButton}>
            <Icon
              name="close-circle-sharp"
              size={60}
              color={colors.lightBlue}
            />
          </TouchableOpacity>
        </View>
        <DriversList
          displayDriverStatus={true}
          drivers={route.params.drivers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.mediumBlue,
  },
  map: {
    width: 200,
    height: 250,
    margin: 32,
  },
  image: {
    width: 250,
    height: 350,
    justifyContent: 'center',
  },
  driver: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  players: {
    flex: 1,
    marginHorizontal: 32,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    padding: 8,
  },
  closeButton: {
    width: 60,
  },
  driversContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default Game;
