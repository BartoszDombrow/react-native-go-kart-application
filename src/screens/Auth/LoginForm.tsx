import React, {useContext, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import FormInput from '../../components/atoms/FormInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';
import CustomButton from '../../components/atoms/CustomButton';
import {client, setAccessToken} from '../../api/client';
import InfoModal from '../../components/molecules/InfoModal';
import colors from '../../constants/Colors';
import axios from 'axios';
import UserContext from '../../context/UserProvider';

interface FormValue {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {t} = useTranslation();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showIndicator, setShowIndicator] = useState(false);
  const {setUser} = useContext(UserContext);

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
    onSubmit: async values => {
      try {
        setShowIndicator(true);
        const response = await client.post(
          '/users/login',
          {email: values.email, password: values.password},
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
          },
        );

        const accessToken = response?.data?.accessToken;
        setAccessToken(accessToken);

        const getUser = await client.get('users/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        setUser(getUser.data);
        setShowIndicator(false);
        navigation.navigate('MainView');
      } catch (err) {
        setShowIndicator(false);
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            setErrorMessage(t('serverError.noServerResponse'));
          } else if (err.response?.status === 400) {
            setErrorMessage(t('serverError.badRequest'));
          } else if (err.response?.status === 401) {
            setErrorMessage(t('authError.invalidEmailOrPassword'));
          } else {
            setErrorMessage(t('serverError.unexpectedError'));
          }
        } else {
          setErrorMessage(t('serverError.unexpectedError'));
        }
        errorModalHandler();
      }
      formik.resetForm();
    },
  });

  const errorModalHandler = () => {
    isErrorModalVisible
      ? setIsErrorModalVisible(false)
      : setIsErrorModalVisible(true);
  };

  return (
    <>
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
          {showIndicator && (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color={colors.lightBlue} />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={t('play')}
            buttonVariant="bigButton"
            onPress={formik.handleSubmit}
          />
        </View>
      </View>
      <InfoModal
        message={errorMessage}
        modalTitle={t('error')}
        isVisible={isErrorModalVisible}
        onDismiss={() => {
          errorModalHandler();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  formBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
  },
  inputContainer: {
    alignItems: 'center',
  },
  indicator: {
    padding: 8,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 32,
  },
});

export default LoginForm;
