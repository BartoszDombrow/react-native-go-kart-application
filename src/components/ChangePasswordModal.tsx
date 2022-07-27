import React from 'react';
import {View, Modal, StyleSheet, Alert} from 'react-native';
import colors from '../constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import {useTranslation} from 'react-i18next';
import Typography from '../typography/Typography';
import CustomButton from './button/CustomButton';

interface Props {
  changePasswordVisible: boolean;
  changePasswordHandler: () => void;
}

interface FormValue {
  password: string;
  newPassword: string;
}

const ChangePasswordModal: React.FC<Props> = ({
  changePasswordVisible,
  changePasswordHandler,
}) => {
  const {t} = useTranslation();

  const formik = useFormik<FormValue>({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          t('yupValidation.invalidPassword'),
        )
        .required(t('yupValidation.requiredField')),
      newPassword: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          t('yupValidation.invalidPassword'),
        )
        .required(t('yupValidation.requiredField')),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  return (
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
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            value={formik.values.newPassword}
            placeholder={t('newPassword')}
            formikTouched={formik.touched.newPassword}
            formikErrors={formik.errors.newPassword}
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
        <View style={styles.buttonWrapper}>
          <CustomButton
            buttonText={t('exit').toUpperCase()}
            buttonVariant="bigButton"
            onPress={changePasswordHandler}
          />
        </View>
      </View>
    </Modal>
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
});

export default ChangePasswordModal;
