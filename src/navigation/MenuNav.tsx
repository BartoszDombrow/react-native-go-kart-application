import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainView from '../screens/MainView';
import HallOfFame from '../screens/HallOfFame';
import Profile from '../screens/Profile';
import Language from '../screens/Language';
import GameNav from './GameNav';
import Statistics from '../screens/Statistics';

export type MenuStackParams = {
  Menu: undefined;
  Start: undefined;
  HallOfFame: undefined;
  Statistics: undefined;
  // Your team
  Profile: undefined;
  // Sounds
  Language: undefined;
};

const MenuStack = createNativeStackNavigator<MenuStackParams>();

function MenuNav() {
  return (
    <MenuStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        orientation: 'portrait',
      }}
      initialRouteName="Menu">
      <MenuStack.Screen name="Menu" component={MainView} />
      <MenuStack.Screen name="Start" component={GameNav} />
      <MenuStack.Screen name="HallOfFame" component={HallOfFame} />
      <MenuStack.Screen name="Statistics" component={Statistics} />
      <MenuStack.Screen name="Profile" component={Profile} />
      <MenuStack.Screen name="Language" component={Language} />
    </MenuStack.Navigator>
  );
}

export default MenuNav;
