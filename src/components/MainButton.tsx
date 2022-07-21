import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import Typography from '../typography/Typography';

const colors = new Colors();

export type Props = {
  buttonText: string;
  onPress: () => void;
  iconName: string | undefined;
  isLanguagePicked?: boolean;
};

const imageStyle = StyleSheet.create({
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
});

const iconsArray = [
  {
    name: 'profile',
    icon: (
      <Icon
        name={Platform.OS === 'ios' ? 'ios-person-sharp' : 'md-person-sharp'}
        color={colors.darkBlue}
        size={36}
      />
    ),
  },
  {
    name: 'volume',
    icon: <Icon name="volume-high" color={colors.darkBlue} size={36} />,
  },
  {
    name: 'language',
    icon: <Icon name="language" color={colors.darkBlue} size={36} />,
  },
  {
    name: 'start',
    icon: <Icon name="play" color={colors.darkBlue} size={36} />,
  },
  {
    name: 'ranking',
    icon: <Icon name="trophy" color={colors.darkBlue} size={36} />,
  },
  {
    name: 'statistics',
    icon: <Icon name="stats-chart" color={colors.darkBlue} size={36} />,
  },
  {
    name: 'team',
    icon: <Icon name="people-sharp" color={colors.darkBlue} size={36} />,
  },
  // Language flags
  {
    name: 'flag_pl',
    icon: (
      <Image
        source={require('../assets/images/flag_pl.png')}
        style={imageStyle.image}
      />
    ),
  },
  {
    name: 'flag_en',
    icon: (
      <Image
        source={require('../assets/images/flag_en.png')}
        style={imageStyle.image}
      />
    ),
  },
  {
    name: 'flag_de',
    icon: (
      <Image
        source={require('../assets/images/flag_de.png')}
        style={imageStyle.image}
      />
    ),
  },
  {
    name: 'flag_uk',
    icon: (
      <Image
        source={require('../assets/images/flag_uk.png')}
        style={imageStyle.image}
      />
    ),
  },
];

const MainButton: React.FC<Props> = ({buttonText, onPress, iconName, isLanguagePicked}) => {
  return (
    <Shadow useArt style={isLanguagePicked ? styles.buttonShadowPicked : styles.buttonShadow}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={isLanguagePicked ? styles.buttonPicked : styles.button}
          onPress={onPress}>
          <View style={styles.iconBox}>
            {iconsArray.find(icon => icon.name === iconName)?.icon}
          </View>
          <View style={styles.textBox}>
            <Typography variant='mediumButtonText' style={isLanguagePicked ? null : styles.buttonText}>{buttonText}</Typography>
          </View>
        </TouchableOpacity>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  buttonShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.lightBlue,
    width: 320,
    height: 60,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 3, height: 3},
  },
  buttonShadowPicked: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.darkBlue,
    width: 320,
    height: 60,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 3, height: 3},
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
  },
  iconBox: {
    width: 50,
    marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPicked: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.darkBlue,
  },
  buttonTextPicked: {
    color: colors.white,
  }
});

export default MainButton;
