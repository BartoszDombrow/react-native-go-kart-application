import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrayElement} from 'Types';
import colors from '../../constants/Colors';
import drivers from '../../constants/DriversDATA.json';
import fonts from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../../navigation/GameMenuNav';

const DriversList = () => {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();

  const renderItem = ({item: driver}: {item: ArrayElement<typeof drivers>}) => (
    <TouchableOpacity
      onPress={() => {
        gameNavigation.navigate('DriverProfile', {
          driver: driver,
        });
      }}
      style={styles.container}>
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: driver.color,
          borderRadius: 10,
        }}
      />
      <Text style={styles.text}>{driver.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={drivers}
      renderItem={renderItem}
      keyExtractor={driver => driver.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    width: 220,
    marginTop: 16,
    padding: 8,
    borderRadius: 20,
  },
  text: {
    fontSize: 32,
    fontFamily: fonts.primaryFont,
    color: colors.white,
  },
});

export default DriversList;
