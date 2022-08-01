import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GameScreen from '../screens/GameScreen';
import DriverProfile from '../screens/DriverProfile';
import ChooseCar from '../screens/ChooseCar';

export type GameMenuStackParams = {
  GameScreen: undefined;
  DriverProfile: {
    driver: object;
  };
  ChooseCar: undefined;
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
      <GameMenuStack.Screen name="ChooseCar" component={ChooseCar} />
    </GameMenuStack.Navigator>
  );
}

export default GameMenuNav;
