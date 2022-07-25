import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ConnectGame from '../screens/ConnectGame';
import GameScreen from '../screens/GameScreen';

export type GameStackParams = {
  ConnectGame: undefined;
  GameScreen: undefined;
};

const GameStack = createNativeStackNavigator<GameStackParams>();

function GameNav() {
  return (
    <GameStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ConnectGame">
      <GameStack.Screen name="ConnectGame" component={ConnectGame} />
      <GameStack.Screen name="GameScreen" component={GameScreen} />
    </GameStack.Navigator>
  );
}

export default GameNav;
