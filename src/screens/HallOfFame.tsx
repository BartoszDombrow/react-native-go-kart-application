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

  //cos tu jest

  console.log(FameData.sort(compare));

  return (
    <View>
      <Text>Siema</Text>
    </View>
  );
}

export default Halloffame;
