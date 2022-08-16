import React from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrayElement} from 'Types';
import colors from '../../constants/Colors';
import drivers from '../../constants/DriversDATA.json';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../../navigation/GameMenuNav';
import Typography from '../atoms/Typography';
import {useTranslation} from 'react-i18next';

interface Prop {
  displayDriverStatus?: boolean;
}

const DriversList: React.FC<Prop> = ({displayDriverStatus}) => {
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
            driver,
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
          {displayDriverStatus ? (
            <View style={styles.raceStats}>
              <Typography variant="smallButtonText">
                {`${driver.position}.`}
              </Typography>
              <Typography variant="smallButtonText">{driver.name}</Typography>
              <Typography variant="smallButtonText">
                {dayjs()
                  .startOf('day')
                  .millisecond(driver.time)
                  .format('mm:ss:SSS')}
              </Typography>
            </View>
          ) : (
            <Typography variant="smallButtonText">{driver.name}</Typography>
          )}
        </View>
      </TouchableOpacity>
    );
    type Driver = ArrayElement<typeof drivers>;

    const compare = (driverA: Driver, driverB: Driver) =>
      driverA.position - driverB.position;

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={drivers.sort(compare)}
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
  },
  raceStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
});

export default DriversList;
