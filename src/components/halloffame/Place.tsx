import React, { useState } from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

import Colors from '../../constants/Colors';
import Typography from '../../typography/Typography';

interface Props {
  playerName: string;
  playerTime: string;
  height: 180 | 140 | 110;  // place: first | second | third
  place: '1' | '2' | '3'
}

const colors = new Colors();

const Place: React.FC<Props> = ({playerName, playerTime, height, place}) => {

  return (
    <View style={styles.place}>
      <Typography variant="spanPrimaryBold" style={styles.playerName}>
        {playerName}
      </Typography>
      <Typography variant="span" style={styles.playerTime}>
        {playerTime}
      </Typography>
      <Shadow useArt style={{height: height, width: 90, ...styles.placeShadowStyle}}>
        <View style={styles.placeStyle}>
          <Typography variant="bigTitle" style={styles.position}>
            {place}
          </Typography>
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  place: {
    alignItems: 'center',
    width: 120,
    padding: 1,
    justifyContent: 'flex-end',
  },
  placeShadowStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  placeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  playerName: {
    width: 128,
    textAlign: 'center',
    height: 24,
  },
  playerTime: {
    paddingBottom: 10,
  },
  position: {
    color: colors.darkBlue,
  },
});

export default Place;
