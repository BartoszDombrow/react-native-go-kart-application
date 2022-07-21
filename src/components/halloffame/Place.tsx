import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Typography from '../../typography/Typography';

interface Props {
  playerName: string;
  playerTime: string;
  place: '1' | '2' | '3';
}

const colors = new Colors();
const fonts = new Fonts();

const Place: React.FC<Props> = ({playerName, playerTime, place}) => {
  let placeShadowStyle: any;
  let placeStyle: StyleProp<ViewStyle>;

  switch (place) {
    case '1':
      placeShadowStyle = styles.firstPlaceDropShadow;
      placeStyle = styles.firstPlace;
      break;
    case '2':
      placeShadowStyle = styles.secondPlaceDropShadow;
      placeStyle = styles.secondPlace;
      break;
    case '3':
      placeShadowStyle = styles.thirdPlaceDropShadow;
      placeStyle = styles.thirdPlace;
      break;
    default:
      undefined;
  }

  return (
    <View style={styles.place}>
      <Typography variant='spanPrimaryBold' style={styles.playerName}>{playerName}</Typography>
      <Typography variant='span' style={styles.playerTime}>{playerTime}</Typography>
      <Shadow useArt style={placeShadowStyle}>
        <View style={placeStyle}>
          <Typography variant='bigTitle' style={styles.position}>{place}</Typography>
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
  firstPlace: {
    width: 90,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  firstPlaceDropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 90,
    height: 180,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  secondPlace: {
    width: 90,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  secondPlaceDropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 90,
    height: 140,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  thirdPlace: {
    width: 90,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  thirdPlaceDropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 90,
    height: 110,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
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
