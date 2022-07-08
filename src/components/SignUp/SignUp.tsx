import React from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {Formik, useFormik} from 'formik';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

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
    <View>
      <Formik<FormValue>
        initialValues={formik.initialValues}
        onSubmit={formik.submitForm}>
        <View>
          <TextInput
            style={styles.form}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            placeholder="Username"
            value={formik.values.username}
          />
          <TextInput
            style={styles.form}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            placeholder="Email"
            value={formik.values.email}
          />
          <TextInput
            style={styles.form}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            placeholder="Password"
            value={formik.values.password}
          />
          <TextInput
            style={styles.form}
            onChangeText={formik.handleChange('recoverPassword')}
            onBlur={formik.handleBlur('recoverPassword')}
            placeholder="Password"
            value={formik.values.recoverPassword}
          />
        </View>
      </Formik>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  loginContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    width: 325,
    backgroundColor: '#BDD5EA',
    margin: 5,
    padding: 10,
    borderRadius: 20,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    width: 300,
    height: 80,
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
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 10,
  },
});
