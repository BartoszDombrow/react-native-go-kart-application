import React, {useContext, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import FormInput from '../../components/atoms/FormInput';
import colors from '../../constants/Colors';
import fonts from '../../constants/Fonts';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../../navigation/MenuNav';
import {useNavigation} from '@react-navigation/native';
import ChangePasswordModal from './ChangePasswordModal';
import DeleteAccountModal from './DeleteAccountModal';
import {useTranslation} from 'react-i18next';
import Typography from '../../components/atoms/Typography';
import CustomButton from '../../components/atoms/CustomButton';
import InfoModal from '../../components/molecules/InfoModal';
import {accessToken, client} from '../../api/client';
import axios from 'axios';
import UserContext from '../../context/UserProvider';

interface FormValue {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

const Profile = () => {
  const {t} = useTranslation();
  const {user, setUser} = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const [deleteAccountVisible, setDeleteAccounVisible] = useState(false);
  const [changePasswordVisible, setchangePasswordVisible] = useState(false);
  const [
    isChangeUserDataInfoModalVisible,
    setIsChangeUserDataInfoModalVisible,
  ] = useState(false);
  const [changeUserDataInfoModalMessage, setChangeUserDataInfoModalMessage] =
    useState('');
  const [isChangeUserDataCorrect, setIsChangeUserDataCorrect] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  const submitHandler = (isUserDataCorrect: boolean, isIndicator: boolean) => {
    setIsChangeUserDataCorrect(isUserDataCorrect);
    setShowIndicator(isIndicator);
  };

  const formik = useFormik<FormValue>({
    initialValues: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, t('yupValidation.minLength', {length: 6}))
        .max(15, t('yupValidation.maxLength', {length: 15}))
        .required(t('yupValidation.requiredField')),
      email: Yup.string()
        .email(t('yupValidation.invalidEmail'))
        .required(t('yupValidation.requiredField')),
      firstName: Yup.string()
        .min(2, t('yupValidation.minLength', {length: 2}))
        .required(t('yupValidation.requiredField')),
      lastName: Yup.string()
        .min(2, t('yupValidation.minLength', {length: 2}))
        .required(t('yupValidation.requiredField')),
    }),
    onSubmit: async values => {
      setShowIndicator(true);
      try {
        let userPatchObject: FormValue = {};
        if (values.firstName !== formik.initialValues.firstName) {
          userPatchObject.firstName = values.firstName;
        }
        if (values.lastName !== formik.initialValues.lastName) {
          userPatchObject.lastName = values.lastName;
        }
        if (values.username !== formik.initialValues.username) {
          userPatchObject.username = values.username;
        }
        if (values.email !== formik.initialValues.email) {
          userPatchObject.email = values.email;
        }
        if (Object.keys(userPatchObject).length !== 0) {
          const response = await client.patch('users/', userPatchObject, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          });
          setUser(response.data);
          setChangeUserDataInfoModalMessage(
            t('patchUserDataValidation.correct'),
          );
          submitHandler(true, false);
          // formik.initialValues.firstName = values.firstName;
          // formik.initialValues.lastName = values.lastName;
          // formik.initialValues.username = values.username;
          // formik.initialValues.email = values.email;
          formik.resetForm();
          changeUserDataHandler();
        } else {
          submitHandler(false, false);
          setChangeUserDataInfoModalMessage(
            t('patchUserDataValidation.noChanges'),
          );
          changeUserDataHandler();
        }
      } catch (err) {
        submitHandler(false, false);
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            setChangeUserDataInfoModalMessage(
              t('serverError.noServerResponse'),
            );
          } else if (err.response?.status === 400) {
            setChangeUserDataInfoModalMessage(t('serverError.badRequest'));
          } else if (err.response?.status === 401) {
            setChangeUserDataInfoModalMessage(
              t('patchUserDataValidation.emailExists'),
            );
          } else if (err.response?.status === 409) {
            if (err.response.data.message.includes('email')) {
              setChangeUserDataInfoModalMessage(
                t('patchUserDataValidation.emailExists'),
              );
            }
          } else if (err.response?.status === 500) {
            // patch request with already existing username returns error code 500...
            setChangeUserDataInfoModalMessage(
              t('patchUserDataValidation.usernameExists'),
            );
          } else {
            setChangeUserDataInfoModalMessage(t('serverError.unexpectedError'));
          }
        } else {
          setChangeUserDataInfoModalMessage(t('serverError.unexpectedError'));
        }
        changeUserDataHandler();
        formik.resetForm();
      }
    },
  });

  const deleteAccountHandler = () => {
    setDeleteAccounVisible(state => !state);
  };

  const changePasswordHandler = () => {
    setchangePasswordVisible(state => !state);
  };

  const changeUserDataHandler = () => {
    setIsChangeUserDataInfoModalVisible(state => !state);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="mediumTitle" style={styles.title}>
            {t('profile')}
          </Typography>
        </View>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <FormInput
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              value={formik.values.firstName}
              placeholder={t('firstname')}
              formikTouched={formik.touched.firstName}
              formikErrors={formik.errors.firstName}
            />
            <FormInput
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              value={formik.values.lastName}
              placeholder={t('lastname')}
              formikTouched={formik.touched.lastName}
              formikErrors={formik.errors.lastName}
            />
            <FormInput
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
              placeholder={t('username')}
              formikTouched={formik.touched.username}
              formikErrors={formik.errors.username}
            />
            <FormInput
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
              placeholder={t('email')}
              formikTouched={formik.touched.email}
              formikErrors={formik.errors.email}
            />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.button}>
              <CustomButton
                buttonText={t('saveChanges')}
                buttonVariant="smallButton"
                onPress={formik.handleSubmit}
              />
            </View>
            <View style={styles.button}>
              <CustomButton
                buttonText={t('changePassword')}
                buttonVariant="smallButton"
                onPress={changePasswordHandler}
              />
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <CustomButton
            buttonText={t('deleteAccount')}
            buttonVariant="smallButton"
            onPress={deleteAccountHandler}
          />
        </View>
        {showIndicator && (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color={colors.lightBlue} />
          </View>
        )}
        <View style={styles.returnButton}>
          <CustomButton
            buttonText={t('return')}
            buttonVariant="bigButton"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <ChangePasswordModal
          changePasswordVisible={changePasswordVisible}
          changePasswordHandler={changePasswordHandler}
        />
        <DeleteAccountModal
          deleteAccountVisible={deleteAccountVisible}
          deleteAccountHandler={deleteAccountHandler}
        />
      </View>
      <InfoModal
        isVisible={isChangeUserDataInfoModalVisible}
        message={changeUserDataInfoModalMessage}
        modalTitle={isChangeUserDataCorrect ? t('success') : t('error')}
        onDismiss={changeUserDataHandler}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
    alignItems: 'center',
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 16,
  },
  content: {
    flex: 0.6,
    alignItems: 'center',
  },
  formContainer: {
    paddingBottom: 8,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 8,
  },
  buttonShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.lightBlue,
    height: 55,
    width: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 3, height: 3},
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.darkBlue,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: -2, height: 4},
    textShadowRadius: 10,
  },
  returnButton: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    padding: 8,
  },
});

export default Profile;
