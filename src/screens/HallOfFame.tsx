import React from 'react';
import {View, Text} from 'react-native';
import {FameData} from '../constants/FameData';

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

  const FameDataArray = FameData.sort(compare);

  return (
    <View>
      <Text>{FameDataArray[0].name}</Text>
      <Text>{FameDataArray[0].time}</Text>
      <Text>{FameDataArray[1].name}</Text>
      <Text>{FameDataArray[1].time}</Text>
      <Text>{FameDataArray[2].name}</Text>
      <Text>{FameDataArray[2].time}</Text>
    </View>
  );
}

export default Halloffame;
