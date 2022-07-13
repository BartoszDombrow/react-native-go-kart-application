import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Auth from '../screens/Auth';
import MainView from '../screens/MainView';

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
      <RootStack.Screen name="MainView" component={MainView} />
    </RootStack.Navigator>
  );
}

export default StackNav;
