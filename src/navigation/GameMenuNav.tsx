import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Lobby from '../screens/Lobby';
import DriverProfile from '../screens/DriverProfile';
import Race from '../screens/Race';
import ChooseCar from '../screens/ChooseCar';
import DriverScreen from '../screens/DriverScreen';
import {Participants} from '../context/ParticipantsProvider';

export type GameMenuStackParams = {
  Lobby: undefined;
  DriverProfile: {
    driver: Participants;
  };
  Race: {
    drivers: Participants[];
  };
  ChooseCar: undefined;
  DriverScreen: {
    drivers: Participants[];
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
      initialRouteName="Lobby">
      <GameMenuStack.Screen name="Lobby" component={Lobby} />
      <GameMenuStack.Screen name="DriverProfile" component={DriverProfile} />
      <GameMenuStack.Screen name="Race" component={Race} />
      <GameMenuStack.Screen name="ChooseCar" component={ChooseCar} />
      <GameMenuStack.Screen name="DriverScreen" component={DriverScreen} />
    </GameMenuStack.Navigator>
  );
}

export default GameMenuNav;
