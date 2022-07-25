import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import {GameStackParams} from '../navigation/GameNav';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import colors from '../constants/Colors';

function GameScreen() {
  const navigationGame =
    useNavigation<NativeStackNavigationProp<GameStackParams>>();

  return (
    <View style={styles.container}>
      <Text>GameScreen</Text>
      <SubmitButton
        buttonText="BACK"
        onPress={() => navigationGame.navigate('ConnectGame')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
});

export default GameScreen;
