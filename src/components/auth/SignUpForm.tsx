import React from 'react';
import {View, TextInput, StyleSheet, Alert, ScrollView} from 'react-native';
import {Formik, useFormik} from 'formik';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import SubmitButton from '../SubmitButton';

const fonts = new Fonts();
const colors = new Colors();

interface FormValue {
  username: string;
  email: string;
  password: string;
  recoverPassword: string;
}

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      recoverPassword: '',
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
        <ScrollView style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              placeholder="Username"
              value={formik.values.username}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              placeholder="Email"
              value={formik.values.email}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Password"
              value={formik.values.password}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={formik.handleChange('recoverPassword')}
              onBlur={formik.handleBlur('recoverPassword')}
              placeholder="Password"
              value={formik.values.recoverPassword}
            />
          </View>
        </ScrollView>
      </Formik>
      <SubmitButton buttonText="PLAY" onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    height: '60%',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
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
  button: {
    marginTop: 10,
  },
});

export default SignUp;
