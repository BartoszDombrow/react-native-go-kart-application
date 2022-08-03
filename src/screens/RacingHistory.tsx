import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../components/button/CustomButton';
import RaceRecord from '../components/statistics/RaceRecord';
import colors from '../constants/Colors';
import {StatisticsStackParams} from '../navigation/StatisticsNav';
import Typography from '../typography/Typography';

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
        <Typography variant="spanBold">{t('numberOfEvents')}: 3</Typography>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* map user's racing history here (maybe in FlatList),
              only added example records in ScrollView
          */}
          <View style={{alignItems: 'center'}}>
            <RaceRecord
              raceDate="19.07.2022 16:45"
              trackName="Le Mans Wrocław"
            />
            <RaceRecord
              raceDate="18.07.2022 13:24"
              trackName="Le Mans Wrocław"
            />
            <RaceRecord
              raceDate="7.07.2022 11:11"
              trackName="Le Mans Wrocław"
            />
            <RaceRecord
              raceDate="7.07.2022 11:11"
              trackName="Le Mans Wrocław"
            />
            <RaceRecord
              raceDate="7.07.2022 11:11"
              trackName="Le Mans Wrocław"
            />
            <RaceRecord
              raceDate="7.07.2022 11:11"
              trackName="Le Mans Wrocław"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={t('exit').toUpperCase()}
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
