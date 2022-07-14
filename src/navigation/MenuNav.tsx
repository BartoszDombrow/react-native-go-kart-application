import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainView from '../screens/MainView';
import HallOfFame from '../screens/HallOfFame';
import Profile from '../screens/Profile';

export type MenuStackParams = {
  Menu: undefined;
  // Start
  HallOfFame: undefined;
  // Statistics
  // Your team
  Profile: undefined;
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
    </MenuStack.Navigator>
  );
}

export default MenuNav;
