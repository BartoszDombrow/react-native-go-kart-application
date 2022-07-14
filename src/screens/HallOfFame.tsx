import React from 'react';
import players from '../constants/FameDataJSON.json';
import {View, Text, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import SubmitButton from '../components/SubmitButton';

const colors = new Colors();
const fonts = new Fonts();

function Halloffame() {
  const compare = (a: any, b: any) => {
    const fameA = a.time;
    const fameB = b.time;

    let comparison = 0;

    if (fameA > fameB) {
      comparison = 1;
    } else if (fameA < fameB) {
      comparison = -1;
    }
    return comparison;
  };

  const myArr = players.player;

  const FameDataArray = myArr.sort(compare);

  return (
    <View style={styles.container}>
      <View style={styles.rankingHeader}>
        <Text>Header</Text>
      </View>
      <View style={styles.ranking}>
        <View style={styles.rankignContainer}>
          <View style={styles.place}>
            <Text style={styles.playerName}>{FameDataArray[2].name}</Text>
            <Text style={styles.playerTime}>
              {dayjs(FameDataArray[2].time).format('mm:ss:SSS')}
            </Text>
            <View style={styles.thirdPlace}>
              <Text style={styles.position}>3</Text>
            </View>
          </View>
          <View style={styles.place}>
            <Text style={styles.playerName}>{FameDataArray[0].name}</Text>
            <Text style={styles.playerTime}>
              {dayjs(FameDataArray[0].time).format('mm:ss:SSS')}
            </Text>
            <View style={styles.firstPlace}>
              <Text style={styles.position}>1</Text>
            </View>
          </View>
          <View style={styles.place}>
            <Text style={styles.playerName}>{FameDataArray[1].name}</Text>
            <Text style={styles.playerTime}>
              {dayjs(FameDataArray[1].time).format('mm:ss:SSS')}
            </Text>
            <View style={styles.secondPlace}>
              <Text style={styles.position}>2</Text>
            </View>
          </View>
        </View>
        <SubmitButton buttonText="EXIT" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  rankingHeader: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ranking: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rankignContainer: {
    flexDirection: 'row',
  },
  place: {
    alignItems: 'center',
    width: 110,
    padding: 1,
    justifyContent: 'flex-end',
  },
  firstPlace: {
    width: 90,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
  },
  secondPlace: {
    width: 90,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
  },
  thirdPlace: {
    width: 90,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
  },
  playerName: {
    fontFamily: fonts.primaryFont,
    color: colors.white,
    fontSize: 22,
  },
  playerTime: {
    fontFamily: fonts.secondaryFont,
    color: colors.white,
    fontSize: 16,
  },
  position: {
    fontSize: 64,
    fontFamily: fonts.primaryFont,
    color: colors.darkBlue,
  },
});

export default Halloffame;
