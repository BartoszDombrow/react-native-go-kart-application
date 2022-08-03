import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNav';
import {MenuStackParams} from '../navigation/MenuNav';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';
import {StackNavigationProp} from '@react-navigation/stack';

type MenuNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParams>,
  StackNavigationProp<MenuStackParams>
>;

const MainView = () => {
  const navigation = useNavigation<MenuNavigationProp>();

  const [isVisible, setIsVisible] = useState(false);

  const settingsHandler = () => {
    setIsVisible(!isVisible);
  };
  const {t} = useTranslation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <View style={styles.settingsContainer}>
          <TouchableOpacity onPress={settingsHandler} style={styles.icon}>
            <Icon name={'settings'} color={colors.darkBlue} size={50} />
          </TouchableOpacity>
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
          onPress={() => navigation.navigate('Start')}
          buttonVariant="mediumButton"
          iconName="play"
        />
        <CustomButton
          buttonText={t('hallOfFame')}
          onPress={() => navigation.navigate('HallOfFame')}
          buttonVariant="mediumButton"
          iconName="trophy"
        />
        <CustomButton
          buttonText={t('statistics')}
          onPress={() => navigation.navigate('Statistics')}
          buttonVariant="mediumButton"
          iconName="stats-chart"
        />
      </View>
    </View>
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
  icon: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 10,
    elevation: 22,
    borderRadius: 30,
    width: 50,
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
  headerText: {
    color: colors.darkBlue,
  },
});

export default MainView;
