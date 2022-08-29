import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/StackNav';
import {StatusBar} from 'react-native';
import {UserProvider} from './src/context/UserProvider';

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <StatusBar hidden />
        <StackNav />
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
