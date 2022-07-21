import React from 'react';
import {View, Modal, StyleSheet, Alert} from 'react-native';
import SubmitButton from './SubmitButton';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import {useTranslation} from 'react-i18next';
import Typography from '../typography/Typography';

const fonts = new Fonts();
const colors = new Colors();

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
  const formik = useFormik<FormValue>({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      password: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('This field is required'),
      newPassword: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('This field is required'),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  const {t} = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={changePasswordHandler}
      visible={changePasswordVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Typography variant='smallTitle' style={styles.headerText}>{t('changePassword')}</Typography>
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
          <SubmitButton
            buttonText={t('saveChanges')}
            onPress={formik.handleSubmit}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <SubmitButton
            buttonText={t('exit')}
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
    flex: 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    paddingVertical: 40,
  },
  formWrapper: {
    flex: 1,
    paddingTop: 70,
  },
  buttonWrapper: {
    flex: 0.2,
  },
});

export default ChangePasswordModal;
