import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Modal} from 'react-native';
import {useFormik} from 'formik';
import Colors from '../../constants/Colors';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../FormInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';
import {ScrollView} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import Typography from '../../typography/Typography';
import CustomButton from '../button/CustomButton';

const colors = new Colors();

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
        .min(6, 'Must be 6 characters or more')
        .max(15, 'Must be 15 characters or less')
        .required('This field is required'),
      firstname: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('This field is required'),
      lastname: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .required('This field is required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('This field is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
      privacyPolicy: Yup.boolean()
        .oneOf([true], 'The privacy policy must be accepted.')
        .required('This field is required'),
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
          <View style={styles.scrollContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
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

          <View style={styles.checkBoxWrapper}>
            <View>
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
        </View>
        <CustomButton
          buttonText={t('start').toUpperCase()}
          buttonVariant="bigButton"
          onPress={formik.handleSubmit}
        />
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  inputWrapper: {
    flex: 0.9,
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
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
  checkBoxWrapper: {
    flex: 0.2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSpan: {
    color: colors.lightBlue,
  },
});

export default SignUp;
