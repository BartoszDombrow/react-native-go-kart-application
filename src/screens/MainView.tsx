import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MainViewButton from '../components/MainViewButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const colors = new Colors();
const fonts = new Fonts();

const MainView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <View style={styles.contentContainer}>
        <MainViewButton
          buttonText="Start"
          onPress={() => navigation.navigate('Auth')}
        />
        <MainViewButton
          buttonText="Hall of fame"
          onPress={() => navigation.navigate('Auth')}
        />
        <MainViewButton
          buttonText="Statistics"
          onPress={() => navigation.navigate('Auth')}
        />
        <MainViewButton
          buttonText="Your team"
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 64,
    fontFamily: fonts.primaryFont,
    color: colors.white,
  },
});

export default MainView;
