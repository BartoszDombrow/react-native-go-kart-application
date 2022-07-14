import React from 'react';
import players from '../constants/FameDataJSON.json';
import {View, Text, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import Colors from '../constants/Colors';
import SubmitButton from '../components/SubmitButton';

const colors = new Colors();

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
    <View style={styles.rankingContainer}>
      <View></View>
      <View>
        <Text>{FameDataArray[0].name}</Text>
        <Text>{dayjs(FameDataArray[0].time).format('mm:ss:SSS')}</Text>
        <Text>{FameDataArray[1].name}</Text>
        <Text>{dayjs(FameDataArray[1].time).format('mm:ss:SSS')}</Text>
        <Text>{FameDataArray[2].name}</Text>
        <Text>{dayjs(FameDataArray[2].time).format('mm:ss:SSS')}</Text>
      </View>
      <SubmitButton buttonText="EXIT" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  rankingContainer: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
});

export default Halloffame;
