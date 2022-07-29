import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ConnectGame from '../screens/ConnectGame';
import GameMenuNav from './GameMenuNav';

export type GameStackParams = {
  ConnectGame: undefined;
  GameMenuNav: undefined;
};

const GameStack = createNativeStackNavigator<GameStackParams>();

function GameNav() {
  return (
    <GameStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        orientation: 'portrait',
      }}
      initialRouteName="ConnectGame">
      <GameStack.Screen name="ConnectGame" component={ConnectGame} />
      <GameStack.Screen
        name="GameMenuNav"
        component={GameMenuNav}
        options={{orientation: 'landscape'}}
      />
    </GameStack.Navigator>
  );
}

export default GameNav;
