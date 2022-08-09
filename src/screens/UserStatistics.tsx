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
      <Typography variant="mediumTitle">{t('racingHistory')}</Typography>
      <View style={styles.wrappers}>
        <Typography variant="mediumButtonText">{t('laps')}:</Typography>
        <View>
          <Typography variant="basicTextBold">
            {dayjs().millisecond(13567000).format('mm:ss:SSS')}
          </Typography>
          <Typography variant="basicTextBold">
            {dayjs().millisecond(13567000).format('mm:ss:SSS')}
          </Typography>
          <Typography variant="basicTextBold">
            {dayjs().millisecond(13567000).format('mm:ss:SSS')}
          </Typography>
          <Typography variant="basicTextBold">
            {dayjs().millisecond(13567000).format('mm:ss:SSS')}
          </Typography>
        </View>
      </View>
      <View style={styles.wrappers}>
        <Typography variant="mediumButtonText">{t('totalTime')}: </Typography>
        <Typography variant="basicTextBold">
          {dayjs().millisecond(54268000).format('mm:ss:SSS')}
        </Typography>
      </View>
      <CustomButton
        buttonText={t('showMore')}
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
  wrappers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
});

export default UserStatistics;
