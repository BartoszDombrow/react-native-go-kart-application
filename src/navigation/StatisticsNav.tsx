import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Statistics from '../screens/Statistics';
import RacingHistory from '../screens/RacingHistory';
import UserStatistics from '../screens/UserStatistics';

export type StatisticsStackParams = {
  Stats: undefined;
  History: undefined;
  RaceDetails: undefined;
  UserStatistics: undefined;
};

const StatisticsStack = createNativeStackNavigator<StatisticsStackParams>();

function StatisticsNav() {
  return (
    <StatisticsStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        orientation: 'portrait',
      }}
      initialRouteName="Stats">
      <StatisticsStack.Screen name="Stats" component={Statistics} />
      <StatisticsStack.Screen name="History" component={RacingHistory} />
      <StatisticsStack.Screen
        name="UserStatistics"
        component={UserStatistics}
      />
    </StatisticsStack.Navigator>
  );
}

export default StatisticsNav;
