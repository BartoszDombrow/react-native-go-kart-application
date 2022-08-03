import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Typography from '../typography/Typography';
import colors from '../constants/Colors';
import StatisticsBox from '../components/statistics/StatisticsBox';
import CustomButton from '../components/button/CustomButton';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {MenuStackParams} from '../navigation/MenuNav';
import {StatisticsStackParams} from '../navigation/StatisticsNav';
import {StackNavigationProp} from '@react-navigation/stack';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          iconName="trophy"
          description="wins"
          statisticsValue="4"
        />
        <StatisticsBox
          iconName="race"
          description="racing"
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
      <View style={styles.racingContainer}>
        <Typography variant="mediumButtonText">{t('lastRace')}</Typography>
        <View style={styles.lastRaceBox}>
          <TouchableOpacity style={styles.lastRace}>
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
                  19.07.2022 16:45
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
          buttonText={t('exit').toUpperCase()}
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
