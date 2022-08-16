import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import driversData from '../constants/DriversDATA.json';
import DriversList from '../components/organisms/DriversList';

function Game() {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  return (
    <View style={styles.container}>
      <View style={styles.map}>
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
        <DriversList displayDriverStatus={true} />
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
    width: 250,
    height: 250,
    margin: 32,
    backgroundColor: colors.darkBlue,
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
