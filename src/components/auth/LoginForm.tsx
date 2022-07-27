import React from 'react';
import {View, StyleSheet, Alert, Dimensions} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import FormInput from '../FormInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';
import CustomButton from '../button/CustomButton';

interface FormValue {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {t} = useTranslation();

  const formik = useFormik<FormValue>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('yupValidation.invalidEmail'))
        .required(t('yupValidation.requiredField')),
      password: Yup.string().required(t('yupValidation.requiredField')),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
      formik.resetForm();
      navigation.navigate('MainView');
    },
  });

  return (
    <View style={styles.formBox}>
      <View style={styles.inputContainer}>
        <FormInput
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          placeholder={t('email')}
          formikTouched={formik.touched.email}
          formikErrors={formik.errors.email}
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
      <CustomButton
        buttonText={t('play').toUpperCase()}
        buttonVariant="bigButton"
        onPress={formik.handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    alignItems: 'center',
    paddingTop: 30,
    width: Dimensions.get('window').width,
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
