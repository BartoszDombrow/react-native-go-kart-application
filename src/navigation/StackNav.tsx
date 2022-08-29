import React, {useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MenuNav from '../navigation/MenuNav';
import Auth from '../screens/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export type RootStackParams = {
  Auth: undefined;
  MainView: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

function StackNav() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        navigation.navigate('MainView');
      }
    };
    getAccessToken();
  }, []);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        orientation: 'portrait',
      }}
      initialRouteName="Auth">
      <RootStack.Screen name="Auth" component={Auth} />
      <RootStack.Screen name="MainView" component={MenuNav} />
    </RootStack.Navigator>
  );
}

export default StackNav;
