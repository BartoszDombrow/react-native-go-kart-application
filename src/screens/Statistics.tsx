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
        <Typography variant="mediumButtonText">{t('lastRacing')}</Typography>
        <View style={styles.lastRacingBox}>
          <Shadow useArt inner style={styles.shadow}>
            <TouchableOpacity>
              <Shadow useArt style={styles.raceRecord}>
                <Typography variant="span">19.07.2022 16:45</Typography>
                <Typography variant="span">Le Mans Wrocław</Typography>
                <Typography
                  variant="span"
                  style={{textDecorationLine: 'underline'}}>
                  Show
                </Typography>
              </Shadow>
            </TouchableOpacity>
          </Shadow>
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
  },
  racingContainer: {
    paddingTop: 16,
    flex: 1,
    alignItems: 'center',
  },
  lastRacingBox: {
    flex: 1,
    paddingBottom: 16,
    alignItems: 'center',
  },
  shadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowColor: '#000000',
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 240,
    height: 100,
    marginVertical: 10,
  },
  raceRecord: {
    width: 220,
    height: 80,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  buttonContainer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
});

export default Statistics;
