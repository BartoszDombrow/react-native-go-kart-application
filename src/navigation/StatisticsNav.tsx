import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Statistics from '../screens/Statistics';
import RacingHistory from '../screens/RacingHistory';

export type StatisticsStackParams = {
  Stats: undefined;
  History: undefined;
  RaceDetails: undefined;
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
    </StatisticsStack.Navigator>
  );
}

export default StatisticsNav;
