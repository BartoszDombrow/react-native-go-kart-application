import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNav';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import Icon from 'react-native-vector-icons/Ionicons';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {useTranslation} from 'react-i18next';

const colors = new Colors();

import Settings from '../components/Settings';
import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';

const MainView = () => {
  const navigationAuth =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigationMenu =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const [isVisible, setIsVisible] = useState(false);

  const settingsHandler = () => {
    setIsVisible(!isVisible);
  };
  const {t} = useTranslation();

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
            <Typography variant="bigTitle" style={styles.headerText}>
              {t('menu')}
            </Typography>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <CustomButton
            buttonText={t('start')}
            onPress={() => navigationAuth.push('MainView')}
            buttonVariant="mediumButton"
            iconName="start"
          />
          <CustomButton
            buttonText={t('hallOfFame')}
            onPress={() => navigationMenu.navigate('HallOfFame')}
            buttonVariant="mediumButton"
            iconName="ranking"
          />
          <CustomButton
            buttonText={t('statistics')}
            onPress={() => navigationAuth.push('MainView')}
            buttonVariant="mediumButton"
            iconName="statistics"
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
    flex: 0.55,
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
    color: colors.darkBlue,
  },
});

export default MainView;
