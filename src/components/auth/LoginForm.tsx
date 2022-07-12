import React from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useFormik, Formik} from 'formik';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import * as Yup from 'yup';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';

const colors = new Colors();
const fonts = new Fonts();

interface FormValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const formik = useFormik<FormValue>({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('This field is required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('This field is required'),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  return (
    <View style={styles.formBox}>
      <ScrollView style={styles.formView}>
        <View style={styles.inputContainer}>
          <FormInput
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            value={formik.values.username}
            placeholder="Username"
            formikTouched={formik.touched.username}
            formikErrors={formik.errors.username}
          />
          <Shadow useArt inner style={styles.textInputShadow}>
            <TextInput
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={colors.darkBlue}
            />
          </Shadow>
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorMessage}>{formik.errors.password}</Text>
          )}
        </View>
      </ScrollView>
      <SubmitButton buttonText="PLAY" onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
  },
  formView: {
    width: '100%',
    height: 240,
  },
  inputContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
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
    marginBottom: 20,
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.secondaryFont,
  },
});

export default LoginForm;
