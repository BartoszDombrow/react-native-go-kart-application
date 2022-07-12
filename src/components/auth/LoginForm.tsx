import React from 'react';
import {View, Alert, TextInput, StyleSheet, ScrollView} from 'react-native';
import {useFormik, Formik, ErrorMessage} from 'formik';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import * as Yup from 'yup';

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
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  return (
    <View style={styles.formBox}>
      <ScrollView style={styles.formView}>
        <Formik<FormValue>
          initialValues={formik.initialValues}
          onSubmit={formik.submitForm}>
          <View style={styles.inputContainer}>
            <Shadow useArt inner style={styles.textInputShadow}>
              <TextInput
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
                style={styles.textInput}
                placeholder="Username"
                placeholderTextColor={colors.darkBlue}
              />
            </Shadow>
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
          </View>
        </Formik>
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
    height: 240
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
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 6,
  },
});

export default LoginForm;
