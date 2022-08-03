import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Typography from '../typography/Typography';
import colors from '../constants/Colors';
import StatisticsBox from '../components/statistics/StatisticsBox';

const Statistics = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Typography variant="bigTitle">{t('statistics')}</Typography>
      </View>
      <View style={styles.statisticsContainer}>
        <StatisticsBox
          iconName="trophy"
          description="wins"
          statisticsValue="4"
        />
        <StatisticsBox
          iconName="race"
          description="race"
          statisticsValue="10"
        />
        <StatisticsBox
          iconName="distance"
          description="totalDistance"
          statisticsValue="4,947 km"
        />
        <StatisticsBox
          iconName="time"
          description="totalTime"
          statisticsValue="01:02:31:47"
        />
      </View>
      <View style={styles.racesContainer}></View>
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 64,
  },
  statisticsContainer: {},
  statisticsBox: {},
  statisticsTile: {},
  racesContainer: {},
  buttonContainer: {},
});

export default Statistics;
