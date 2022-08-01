import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import Typography from '../typography/Typography';

function Game() {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  return (
    <View style={styles.container}>
      <View style={styles.map} />
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
        <View style={styles.driversContainer}>
          <Typography variant="spanBold">Race stats here!</Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.mediumBlue,
  },
  map: {
    width: '60%',
    backgroundColor: colors.darkBlue,
  },
  players: {
    width: '40%',
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
  },
});

export default Game;
