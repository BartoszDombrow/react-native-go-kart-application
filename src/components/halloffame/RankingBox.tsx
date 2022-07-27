import dayjs from 'dayjs';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

import colors from '../../constants/Colors';
import Typography from '../../typography/Typography';

interface Props {
  playerName: string;
  playerTime: number;
  playerPosition: string;
  height: number;
}

const Place: React.FC<Props> = ({
  playerName,
  playerTime,
  height,
  playerPosition,
}) => {
  return (
    <View style={styles.place}>
      <Typography variant="spanPrimaryBold" style={styles.playerName}>
        {playerName}
      </Typography>
      <Typography variant="span" style={styles.playerTime}>
        {dayjs().startOf('day').millisecond(playerTime).format('mm:ss:SSS')}
      </Typography>
      <Shadow useArt style={{height, width: 90, ...styles.placeShadowStyle}}>
        <View style={styles.placeStyle}>
          <Typography variant="bigTitle" style={styles.position}>
            {playerPosition}
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
