import React from 'react';
import {View, TextInput, Alert, StyleSheet} from 'react-native';
import {useFormik, Formik} from 'formik';
import {} from 'yup';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

import SubmitButton from '../SubmitButton';

const colors = new Colors();
const fonts = new Fonts();

interface FormValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  return (
    <View style={styles.formBox}>
      <Formik<FormValue>
        initialValues={formik.initialValues}
        onSubmit={formik.submitForm}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            placeholder="Username"
            placeholderTextColor={colors.darkBlue}
            value={formik.values.username}
            style={styles.textInput}
          />
          <TextInput
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            placeholder="Password"
            placeholderTextColor={colors.darkBlue}
            secureTextEntry
            value={formik.values.password}
            style={styles.textInput}
          />
        </View>
      </Formik>
      <SubmitButton buttonText='PLAY' onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  inputContainer: {
    width: '100%',
    height: '60%',
    alignItems: 'center'
  },
  textInput: {
    width: '80%',
    height: 60,
    textAlign: 'center',
    marginVertical: 15,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    fontFamily: fonts.secondaryFont,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkBlue,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 6,
  },
});

export default LoginForm;
