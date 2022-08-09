import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import CustomButton from '../components/atoms/CustomButton';
import colors from '../constants/Colors';
import {StatisticsStackParams} from '../navigation/StatisticsNav';
import Typography from '../components/atoms/Typography';
import RacingHistoryList from '../components/statistics/RacingHistoryList';
import racingHistoryData from '../constants/RacingHistoryData.json';

const RacingHistory = () => {
  const {t} = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<StatisticsStackParams>>();

  return (
    <View style={styles.screen}>
      <Typography variant="bigTitle" style={styles.title}>
        {t('racingHistory')}
      </Typography>
      <View style={styles.historyContainer}>
        <Typography variant="spanBold">
          {t('numberOfEvents', {number: racingHistoryData.length})}
        </Typography>
        <RacingHistoryList />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={t('exit')}
          buttonVariant="bigButton"
          onPress={() => navigation.navigate('Stats')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
  },
  title: {
    paddingVertical: 16,
  },
  historyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingBottom: 32,
    paddingTop: 8,
    alignItems: 'center',
  },
});

export default RacingHistory;
