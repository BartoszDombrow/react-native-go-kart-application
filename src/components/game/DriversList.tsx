import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrayElement} from 'Types';
import colors from '../../constants/Colors';
import drivers from '../../constants/DriversDATA.json';
import {useNavigation} from '@react-navigation/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../../navigation/GameMenuNav';
import Typography from '../../typography/Typography';
import {useTranslation} from 'react-i18next';

const DriversList = () => {
  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();

  const {t} = useTranslation();

  if (drivers.length) {
    const renderItem = ({
      item: driver,
    }: {
      item: ArrayElement<typeof drivers>;
    }) => (
      <TouchableOpacity
        onPress={() => {
          gameNavigation.navigate('DriverProfile', {
            driver: driver,
          });
        }}
        style={styles.container}>
        <View
          style={{
            backgroundColor: driver.color,
            ...styles.circle,
          }}
        />
        <View style={styles.driverName}>
          <Typography variant="smallButtonText">{driver.name}</Typography>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={drivers}
        renderItem={renderItem}
        keyExtractor={driver => driver.id}
        style={styles.flatlist}
      />
    );
  } else {
    return (
      <View style={styles.noDataContainer}>
        <Typography variant="spanBold">{t('noActiveDrivers')}</Typography>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    marginVertical: 8,
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.45,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    elevation: 3,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  driverName: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default DriversList;
