import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const colors = new Colors();
const fonts = new Fonts();

import Settings from '../components/Settings';

const MainView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [isVisible, setIsVisible] = useState(true);

  const settingsHandler = () => {
    setIsVisible(isVisible => !isVisible);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={settingsHandler} style={{width: 50, height: 50, backgroundColor: 'red'}}>
            
          </TouchableOpacity>
          <Text style={styles.headerText}>Menu</Text>
        </View>
        <View style={styles.contentContainer}>
          <MainButton
            buttonText="Start"
            onPress={() => navigation.navigate('Auth')}
            iconName="start"
          />
          <MainButton
            buttonText="Hall of fame"
            onPress={() => navigation.navigate('Auth')}
            iconName="ranking"
          />
          <MainButton
            buttonText="Statistics"
            onPress={() => navigation.navigate('Auth')}
            iconName="statistics"
          />
          <MainButton
            buttonText="Your team"
            onPress={() => navigation.navigate('Auth')}
            iconName="team"
          />
        </View>
      </View>
      <Settings isVisible={isVisible} settingsHandler={settingsHandler} />
    </>
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
