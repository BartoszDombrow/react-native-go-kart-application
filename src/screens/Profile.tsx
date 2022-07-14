import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import FormInput from '../components/FormInput';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../components/SubmitButton';

const colors = new Colors();
const fonts = new Fonts();

interface FormValue {
  username: string;
  email: string;
}

const Profile = () => {
  const formik = useFormik<FormValue>({
    initialValues: {
      username: '',
      email: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('This field is required'),
      email: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('This field is required'),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.content}>
        <FormInput
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          value={formik.values.username}
          placeholder="Username"
          formikTouched={formik.touched.username}
          formikErrors={formik.errors.username}
        />
        <FormInput
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          placeholder="Email"
          formikTouched={formik.touched.email}
          formikErrors={formik.errors.email}
          secureTextEntry={true}
        />
        <SubmitButton buttonText="SAVE CHANGES" onPress={formik.handleSubmit} />
        <View style={styles.wrapper}>
          <TouchableOpacity activeOpacity={0.75} style={styles.button}>
            <Text>Test</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} style={styles.button}>
            <Text>Test</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 48,
    fontFamily: fonts.primaryFont,
    color: colors.white,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '45%',
    borderRadius: 50,
    backgroundColor: colors.white,
  },
});

export default Profile;
