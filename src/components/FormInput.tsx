import React, {useState} from 'react';
import {TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../constants/Colors';
import fonts from '../constants/Fonts';

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
  const [showPassword, setShowPassword] = useState(true);
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
          secureTextEntry={secureTextEntry && showPassword}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(visible => !visible)}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={24}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        ) : null}
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
    height: 42,
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 55,
  },
  textInput: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: 'transparent',
    fontFamily: fonts.secondaryFontBold,
    fontSize: 18,
    color: colors.darkBlue,
  },
  errorMessage: {
    marginBottom: 4,
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.secondaryFont,
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 20,
  },
});

export default FormInput;
