import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainView from '../screens/MainView';
import HallOfFame from '../screens/HallOfFame';
import Profile from '../screens/Profile';
import Language from '../screens/Language';

export type MenuStackParams = {
  Menu: undefined;
  // Start
  HallOfFame: undefined;
  // Statistics
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
      }}
      initialRouteName="Menu">
      <MenuStack.Screen name="Menu" component={MainView} />
      <MenuStack.Screen name="HallOfFame" component={HallOfFame} />
      <MenuStack.Screen name="Profile" component={Profile} />
      <MenuStack.Screen name="Language" component={Language} />
    </MenuStack.Navigator>
  );
}

export default MenuNav;
