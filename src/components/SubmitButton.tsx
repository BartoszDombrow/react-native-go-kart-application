import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Typography from '../typography/Typography';

const colors = new Colors();
const fonts = new Fonts();

export type Props = {
  buttonText: string;
  onPress: () => void;
};

const SubmitButton: React.FC<Props> = ({buttonText, onPress}) => {
  return (
    <Shadow useArt style={styles.buttonShadow}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.button}
          onPress={onPress}>
          <Typography variant='bigButtonText'>{buttonText}</Typography>
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
    width: 300,
    height: 80,
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
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    color: colors.darkBlue,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 10,
  },
});

export default SubmitButton;
