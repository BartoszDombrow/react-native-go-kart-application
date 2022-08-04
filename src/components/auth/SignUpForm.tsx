import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Modal, Dimensions} from 'react-native';
import {useFormik} from 'formik';
import colors from '../../constants/Colors';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../FormInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';
import {useTranslation} from 'react-i18next';
import Typography from '../../typography/Typography';
import CustomButton from '../button/CustomButton';
import {ScrollView} from 'react-native-gesture-handler';

interface FormValue {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  privacyPolicy: boolean;
}

const SignUp = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const formik = useFormik<FormValue>({
    initialValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      privacyPolicy: false,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(6, t('yupValidation.minLength', {length: 6}))
        .max(15, t('yupValidation.maxLength', {length: 15}))
        .required(t('yupValidation.requiredField')),
      firstname: Yup.string()
        .min(2, t('yupValidation.minLength', {length: 2}))
        .required(t('yupValidation.requiredField')),
      lastname: Yup.string()
        .min(2, t('yupValidation.minLength', {length: 2}))
        .required(t('yupValidation.requiredField')),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          t('yupValidation.invalidPassword'),
        )
        .required(t('yupValidation.requiredField')),
      email: Yup.string()
        .email(t('yupValidation.invalidEmail'))
        .required(t('yupValidation.requiredField')),
      privacyPolicy: Yup.boolean()
        .oneOf([true], t('yupValidation.acceptPrivacyPolicy'))
        .required(t('yupValidation.requiredField')),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
      formik.resetForm();
      navigation.navigate('MainView');
    },
  });

  useEffect(() => {
    if (formik.errors.privacyPolicy) {
      Alert.alert(formik.errors.privacyPolicy);
    }
  }, [formik.errors.privacyPolicy]);

  const handleVisableDismiss = () => {
    setModalVisible(visible => !visible);
  };

  return (
    <>
      <View style={styles.formBox}>
        <View style={styles.inputWrapper}>
          <View style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formView}>
                <FormInput
                  onChangeText={formik.handleChange('username')}
                  onBlur={formik.handleBlur('username')}
                  value={formik.values.username}
                  placeholder={t('username')}
                  formikTouched={formik.touched.username}
                  formikErrors={formik.errors.username}
                />
                <FormInput
                  onChangeText={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                  value={formik.values.firstname}
                  placeholder={t('firstname')}
                  formikTouched={formik.touched.firstname}
                  formikErrors={formik.errors.firstname}
                />
                <FormInput
                  onChangeText={formik.handleChange('lastname')}
                  onBlur={formik.handleBlur('lastname')}
                  value={formik.values.lastname}
                  placeholder={t('lastname')}
                  formikTouched={formik.touched.lastname}
                  formikErrors={formik.errors.lastname}
                />
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
            </ScrollView>
          </View>
        </View>
        <View style={styles.checkBoxWrapper}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={formik.values.privacyPolicy}
              disabled={false}
              onValueChange={value =>
                formik.setFieldValue('privacyPolicy', value)
              }
              tintColors={{true: colors.white, false: colors.white}}
              tintColor={colors.white}
              onCheckColor={colors.white}
              onTintColor={colors.white}
              style={styles.checkBox}
            />
          </View>
          <Typography variant="spanBold">
            {t('privacyPolicy.accept')}
            <Typography
              variant="spanBold"
              onPress={handleVisableDismiss}
              style={styles.textSpan}>
              {` ${t('privacyPolicy.privacyPolicy')}`}
            </Typography>
          </Typography>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={t('start')}
            buttonVariant="bigButton"
            onPress={formik.handleSubmit}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleVisableDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Typography variant="smallTitle" style={styles.modalTitle}>
              {t('privacyPolicy.modal')}
            </Typography>
            <View style={styles.modalText}>
              <Typography variant="basicText">
                {t('privacyPolicy.modal')}
              </Typography>
            </View>
            <View style={styles.modalButton}>
              <CustomButton
                buttonText={t('exit')}
                buttonVariant="bigButton"
                onPress={handleVisableDismiss}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  formBox: {
    alignItems: 'center',
    paddingTop: 32,
    height: Dimensions.get('window').height * 0.9,
    justifyContent: 'flex-end',
  },
  inputWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
  },
  formView: {
    alignItems: 'center',
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  checkBoxContainer: {
    paddingRight: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
  },
  textSpan: {
    color: colors.lightBlue,
  },
  buttonContainer: {
    paddingBottom: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    opacity: 0.97,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    maxWidth: '80%',
    paddingVertical: 60,
  },
  modalText: {
    flex: 1,
  },
  modalButton: {
    paddingVertical: 40,
    alignItems: 'center',
  },
});

export default SignUp;
