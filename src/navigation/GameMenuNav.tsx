import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GameScreen from '../screens/GameScreen';
import DriverProfile from '../screens/DriverProfile';

export type GameMenuStackParams = {
  GameScreen: undefined;
  DriverProfile: {
    driver: object;
  };
};

const GameMenuStack = createNativeStackNavigator<GameMenuStackParams>();

function GameMenuNav() {
  return (
    <GameMenuStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        orientation: 'landscape',
      }}
      initialRouteName="GameScreen">
      <GameMenuStack.Screen name="GameScreen" component={GameScreen} />
      <GameMenuStack.Screen name="DriverProfile" component={DriverProfile} />
    </GameMenuStack.Navigator>
  );
}

export default GameMenuNav;
