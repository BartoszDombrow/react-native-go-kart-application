import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuNav from '../navigation/MenuNav';
import Auth from '../screens/Auth';

export type RootStackParams = {
  Auth: undefined;
  MainView: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

function StackNav() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Auth">
      <RootStack.Screen name="Auth" component={Auth} />
      <RootStack.Screen name="MainView" component={MenuNav} />
    </RootStack.Navigator>
  );
}

export default StackNav;
