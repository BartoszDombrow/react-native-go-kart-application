import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Typography from '../components/atoms/Typography';
import colors from '../constants/Colors';
import StatisticsBox from '../components/statistics/StatisticsBox';
import CustomButton from '../components/atoms/CustomButton';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {MenuStackParams} from '../navigation/MenuNav';
import {StatisticsStackParams} from '../navigation/StatisticsNav';
import {StackNavigationProp} from '@react-navigation/stack';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import dayjs from 'dayjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

type StatisticsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MenuStackParams>,
  StackNavigationProp<StatisticsStackParams>
>;

const Statistics = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<StatisticsNavigationProp>();

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Typography variant="bigTitle">{t('statistics')}</Typography>
      </View>
      <View style={styles.statisticsContainer}>
        <StatisticsBox
          icon={
            <MaterialCommunityIcons
              name="trophy-variant"
              size={32}
              color={colors.white}
            />
          }
          description="wins"
          statisticsValue="4"
        />
        <StatisticsBox
          icon={
            <FontAwesome5
              name="flag-checkered"
              size={32}
              color={colors.white}
            />
          }
          description="racing"
          statisticsValue="10"
        />
      </View>
      <View style={styles.statisticsContainer}>
        <StatisticsBox
          icon={
            <MaterialCommunityIcons
              name="steering"
              size={32}
              color={colors.white}
            />
          }
          description="totalDistance"
          statisticsValue="4,947 km"
        />
        <StatisticsBox
          icon={
            <Ionicons name="hourglass-outline" size={32} color={colors.white} />
          }
          description="totalTime"
          statisticsValue={dayjs()
            .startOf('day')
            .millisecond(123450)
            .format('HH:mm:ss:SSS')}
        />
      </View>
      <View style={styles.racingContainer}>
        <Typography variant="mediumButtonText">{t('lastRace')}</Typography>
        <View style={styles.lastRaceBox}>
          <TouchableOpacity
            style={styles.lastRace}
            onPress={() => navigation.navigate('UserStatistics')}>
            <Shadow useArt style={styles.raceRecord}>
              <View>
                <MaterialIcons
                  name="touch-app"
                  color={colors.white}
                  size={32}
                />
              </View>
              <View>
                <Typography variant="span" style={styles.raceText}>
                  {dayjs('2022-08-10T08:09:00.000Z').format('DD.MM.YYYY HH:mm')}
                </Typography>
                <Typography variant="span" style={styles.raceText}>
                  Le Mans Wrocław
                </Typography>
              </View>
            </Shadow>
          </TouchableOpacity>
          <CustomButton
            buttonText={t('showMore')}
            buttonVariant={'smallButton'}
            onPress={() => navigation.navigate('History')}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={t('exit')}
          buttonVariant="bigButton"
          onPress={() => navigation.navigate('Menu')}
        />
      </View>
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
  statisticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingTop: 8,
  },
  racingContainer: {
    paddingTop: 16,
    flex: 1,
    alignItems: 'center',
  },
  lastRaceBox: {
    flex: 1,
    paddingBottom: 16,
    alignItems: 'center',
  },
  lastRace: {
    marginVertical: 10,
  },
  raceRecord: {
    width: 260,
    height: 50,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    flexDirection: 'row',
  },
  raceText: {
    fontSize: 12,
  },
  buttonContainer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
});

export default Statistics;
