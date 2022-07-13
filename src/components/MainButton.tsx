import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const colors = new Colors();
const fonts = new Fonts();

export type Props = {
  buttonText: string;
  onPress: () => void;
  iconName: string | undefined;
};

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
];

const MainButton: React.FC<Props> = ({buttonText, onPress, iconName}) => {
  return (
    <Shadow useArt style={styles.buttonShadow}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.button}
          onPress={onPress}>
          <View style={styles.iconBox}>{iconsArray.find(icon => icon.name === iconName)?.icon}</View>
          <View style={styles.textBox}>
            <Text style={styles.buttonText}>{buttonText}</Text>
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
    shadowOffset: {width: 3, height: 3}
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
    justifyContent: 'center'
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.darkBlue,
    fontSize: 28,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 10,
  },
});

export default MainButton;
