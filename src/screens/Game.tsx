import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';

function Game() {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();
  return (
    <View style={styles.container}>
      <View style={styles.game} />
      <View style={styles.players}>
        <Icon
          name="close-circle-sharp"
          style={styles.icon}
          onPress={() => gameNavigation.navigate('GameScreen')}
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
  },
  game: {
    width: '60%',
    backgroundColor: colors.darkBlue,
  },
  players: {
    width: '40%',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 30,
    fontSize: 64,
  },
});

export default Game;
