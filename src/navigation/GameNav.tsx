import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ConnectLobby from '../screens/ConnectLobby';
import GameMenuNav from './GameMenuNav';
import {ParticipantsProvider} from '../context/ParticipantsProvider';

export type GameStackParams = {
  ConnectLobby: undefined;
  GameMenuNav: undefined;
};

const GameStack = createNativeStackNavigator<GameStackParams>();

function GameNav() {
  return (
    <ParticipantsProvider>
      <GameStack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarHidden: true,
          orientation: 'portrait',
        }}
        initialRouteName="ConnectLobby">
        <GameStack.Screen name="ConnectLobby" component={ConnectLobby} />
        <GameStack.Screen
          name="GameMenuNav"
          component={GameMenuNav}
          options={{orientation: 'landscape'}}
        />
      </GameStack.Navigator>
    </ParticipantsProvider>
  );
}

export default GameNav;
