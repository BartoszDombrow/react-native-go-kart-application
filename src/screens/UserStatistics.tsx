import React from 'react';
import {View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import CustomButton from '../components/atoms/CustomButton';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {MenuStackParams} from '../navigation/MenuNav';
import {StatisticsStackParams} from '../navigation/StatisticsNav';
import {StackNavigationProp} from '@react-navigation/stack';
import colors from '../constants/Colors';
import Typography from '../components/atoms/Typography';
import {useTranslation} from 'react-i18next';

type StatisticsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MenuStackParams>,
  StackNavigationProp<StatisticsStackParams>
>;

function UserStatistics() {
  const navigation = useNavigation<StatisticsNavigationProp>();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Typography variant="mediumTitle" style={styles.title}>
        {t('racingHistory')}
      </Typography>
      <View style={styles.wrappers}>
        <Typography variant="mediumButtonText" style={styles.timeText}>
          {t('laps')}:
        </Typography>
        <View style={styles.timeContainer}>
          <Typography variant="basicTextBold" style={styles.text}>
            {dayjs().startOf('day').add(13567000).format('mm:ss:SSS')}
          </Typography>
          <Typography variant="basicTextBold" style={styles.text}>
            {dayjs().startOf('day').add(13567000).format('mm:ss:SSS')}
          </Typography>
          <Typography variant="basicTextBold" style={styles.text}>
            {dayjs().startOf('day').add(13567000).format('mm:ss:SSS')}
          </Typography>
          <Typography variant="basicTextBold" style={styles.text}>
            {dayjs().startOf('day').add(13567000).format('mm:ss:SSS')}
          </Typography>
        </View>
      </View>
      <View style={styles.wrappers}>
        <Typography variant="mediumButtonText" style={styles.timeText}>
          {`${t('totalTime')}: `}
        </Typography>
        <Typography variant="basicTextBold" style={styles.timeContainer}>
          {dayjs().startOf('day').add(54268000).format('mm:ss:SSS')}
        </Typography>
      </View>
      <CustomButton
        buttonText={t('showRaceVideoHere')}
        buttonVariant="smallButton"
        onPress={() => navigation.navigate('Stats')}
      />
      <CustomButton
        buttonText={t('exit')}
        buttonVariant="bigButton"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    height: 110,
  },
  wrappers: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    flex: 0.5,
  },
  timeContainer: {
    flex: 0.5,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  text: {
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
});

export default UserStatistics;
