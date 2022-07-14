import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

const colors = new Colors();
const fonts = new Fonts();

import Settings from '../components/Settings';

const MainView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [isVisible, setIsVisible] = useState(false);

  const settingsHandler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <View style={styles.settingsContainer}>
            <Shadow style={styles.shadow}>
              <TouchableOpacity onPress={settingsHandler}>
                <Icon name={'settings'} color={colors.darkBlue} size={50} />
              </TouchableOpacity>
            </Shadow>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Menu</Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <MainButton
            buttonText="Start"
            onPress={() => navigation.push('MainView')}
            iconName="start"
          />
          <MainButton
            buttonText="Hall of fame"
            onPress={() => navigation.push('MainView')}
            iconName="ranking"
          />
          <MainButton
            buttonText="Statistics"
            onPress={() => navigation.push('MainView')}
            iconName="statistics"
          />
          <MainButton
            buttonText="Your team"
            onPress={() => navigation.push('Auth')}
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
    backgroundColor: colors.lightBlue,
  },
  headerContainer: {
    flex: 0.35,
    justifyContent: 'center',
  },
  settingsContainer: {
    paddingLeft: 30,
  },
  titleContainer: {
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 30,
  },
  contentContainer: {
    flex: 0.65,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  shadow: {
    height: 50,
    width: 50,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 64,
    fontFamily: fonts.primaryFont,
    color: colors.darkBlue,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 5,
  },
});

export default MainView;
