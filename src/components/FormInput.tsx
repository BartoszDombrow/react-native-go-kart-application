import React from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const colors = new Colors();
const fonts = new Fonts();

export type Props = {
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  value?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  formikTouched?: boolean;
  formikErrors?: string;
};

const FormInput: React.FC<Props> = ({
  onChangeText,
  onBlur,
  value,
  placeholder,
  secureTextEntry,
  formikTouched,
  formikErrors,
}) => {
  return (
    <>
      <Shadow useArt inner style={styles.textInputShadow}>
        <TextInput
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.darkBlue}
          secureTextEntry={secureTextEntry}
        />
      </Shadow>
      {formikTouched && formikErrors && (
        <Text style={styles.errorMessage}>{formikErrors}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInputShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowColor: '#000000',
    shadowRadius: 5,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 300,
    height: 50,
    marginVertical: 10,
  },
  textInput: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
    fontFamily: fonts.secondaryFont,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
  errorMessage: {
    marginBottom: 4,
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.secondaryFont,
  },
});

export default FormInput;