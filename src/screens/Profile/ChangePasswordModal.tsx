import React, {useContext, useState} from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import colors from '../../constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/atoms/FormInput';
import {useTranslation} from 'react-i18next';
import Typography from '../../components/atoms/Typography';
import CustomButton from '../../components/atoms/CustomButton';
import UserCotext from '../../context/UserProvider';
import InfoModal from '../../components/molecules/InfoModal';
import {client, setAccessToken} from '../../api/client';
import axios from 'axios';

interface Props {
  changePasswordVisible: boolean;
  changePasswordHandler: () => void;
}

interface FormValue {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordModal: React.FC<Props> = ({
  changePasswordVisible,
  changePasswordHandler,
}) => {
  const {t} = useTranslation();
  const {user} = useContext(UserCotext);

  const [showIndicator, setShowIndicator] = useState(false);
  const [
    isChangePasswordInfoModalVisible,
    setIsChangePasswordInfoModalVisible,
  ] = useState(false);
  const [changePasswordInfoModalMessage, setChangePasswordInfoModalMessage] =
    useState('');
  const [isChangePasswordCorrect, setIsChangePasswordCorrect] = useState(false);

  const formik = useFormik<FormValue>({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      password: Yup.string().required(t('yupValidation.requiredField')),
      newPassword: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          t('yupValidation.invalidPassword'),
        )
        .required(t('yupValidation.requiredField')),
      confirmNewPassword: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          t('yupValidation.invalidPassword'),
        )
        .oneOf(
          [Yup.ref('newPassword'), null],
          t('yupValidation.mismatchPassword'),
        )
        .required(t('yupValidation.requiredField')),
    }),
    onSubmit: async values => {
      try {
        setShowIndicator(true);
        const authResponse = await client.post(
          '/users/login',
          {email: user.email, password: values.password},
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
          },
        );
        const accessToken = authResponse?.data?.accessToken;
        setAccessToken(accessToken);

        await client.patch(
          'users/',
          {
            password: values.newPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        setChangePasswordInfoModalMessage(t('passwordValidation.correct'));
        setIsChangePasswordCorrect(true);
        setShowIndicator(false);
        changePassHandler();
        formik.resetForm();
      } catch (err) {
        setShowIndicator(false);
        setIsChangePasswordCorrect(false);
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            setChangePasswordInfoModalMessage(
              t('serverError.noServerResponse'),
            );
          } else if (err.response?.status === 400) {
            setChangePasswordInfoModalMessage(t('serverError.badRequest'));
          } else if (err.response?.status === 401) {
            setChangePasswordInfoModalMessage(
              t('passwordValidation.incorrectPassword'),
            );
          } else {
            setChangePasswordInfoModalMessage(t('serverError.unexpectedError'));
          }
        } else {
          setChangePasswordInfoModalMessage(t('serverError.unexpectedError'));
        }
        changePassHandler();
      }
    },
  });

  const changePassHandler = () => {
    setIsChangePasswordInfoModalVisible(state => !state);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={changePasswordHandler}
        visible={changePasswordVisible}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Typography variant="mediumTitle" style={styles.headerText}>
              {t('changePassword')}
            </Typography>
          </View>
          <View style={styles.formWrapper}>
            <FormInput
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              placeholder={t('password')}
              formikTouched={formik.touched.password}
              formikErrors={formik.errors.password}
              secureTextEntry={true}
            />
            <FormInput
              onChangeText={formik.handleChange('newPassword')}
              onBlur={formik.handleBlur('newPassword')}
              value={formik.values.newPassword}
              placeholder={t('newPassword')}
              formikTouched={formik.touched.newPassword}
              formikErrors={formik.errors.newPassword}
              secureTextEntry={true}
            />
            <FormInput
              onChangeText={formik.handleChange('confirmNewPassword')}
              onBlur={formik.handleBlur('confirmNewPassword')}
              value={formik.values.confirmNewPassword}
              placeholder={t('confirmPassword')}
              formikTouched={formik.touched.confirmNewPassword}
              formikErrors={formik.errors.confirmNewPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.saveButton}>
            <CustomButton
              buttonText={t('saveChanges')}
              buttonVariant="smallButton"
              onPress={formik.handleSubmit}
            />
          </View>
          {showIndicator && (
            <View style={styles.indicator}>
              <ActivityIndicator size="large" color={colors.lightBlue} />
            </View>
          )}
          <View style={styles.buttonWrapper}>
            <CustomButton
              buttonText={t('exit')}
              buttonVariant="bigButton"
              onPress={() => {
                formik.resetForm();
                changePasswordHandler();
              }}
            />
          </View>
        </View>
      </Modal>
      <InfoModal
        isVisible={isChangePasswordInfoModalVisible}
        message={changePasswordInfoModalMessage}
        modalTitle={isChangePasswordCorrect ? t('success') : t('error')}
        onDismiss={changePassHandler}
      />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
    alignItems: 'center',
  },
  header: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    padding: 16,
  },
  formWrapper: {
    flex: 0.4,
    paddingTop: 70,
    alignItems: 'center',
  },
  saveButton: {
    flex: 0.15,
    paddingTop: 10,
  },
  buttonWrapper: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    padding: 8,
  },
});

export default ChangePasswordModal;
