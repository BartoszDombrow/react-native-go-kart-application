import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import FormInput from '../FormInput';
import SubmitButton from '../SubmitButton';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';

interface FormValue {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
      formik.resetForm();
      navigation.navigate('MainView');
    },
  });

  const {t} = useTranslation();

  return (
    <View style={styles.formBox}>
      <View style={styles.inputContainer}>
        <FormInput
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          value={formik.values.username}
          placeholder={t('username')}
          formikTouched={formik.touched.username}
          formikErrors={formik.errors.username}
        />
        <FormInput
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
          placeholder={t('password')}
          formikTouched={formik.touched.password}
          formikErrors={formik.errors.password}
          secureTextEntry={true}
        />
      </View>

      <SubmitButton buttonText={t('play')} onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  formView: {
    height: 240,
  },
  inputContainer: {
    flex: 0.9,
    alignItems: 'center',
  },
});

export default LoginForm;
