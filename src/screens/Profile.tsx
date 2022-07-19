import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import FormInput from '../components/FormInput';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import SubmitButton from '../components/SubmitButton';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useNavigation} from '@react-navigation/native';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DeleteAccountModal from '../components/DeleteAccountModal';
import {useTranslation} from 'react-i18next';

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

  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const [deleteAccountVisible, setDeleteAccounVisible] = useState(false);
  const [changePasswordVisible, setchangePasswordVisible] = useState(false);

  const deleteAccountHandler = () => {
    setDeleteAccounVisible(!deleteAccountVisible);
  };

  const changePasswordHandler = () => {
    setchangePasswordVisible(!changePasswordVisible);
  };

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('Profile')}</Text>
      </View>
      <View style={styles.content}>
        <FormInput
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
          value={formik.values.username}
          placeholder={t('Username')}
          formikTouched={formik.touched.username}
          formikErrors={formik.errors.username}
        />
        <FormInput
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
          placeholder={t('Email')}
          formikTouched={formik.touched.email}
          formikErrors={formik.errors.email}
          secureTextEntry={true}
        />
        <SubmitButton
          buttonText={t('SaveChanges')}
          onPress={formik.handleSubmit}
        />
        <View style={styles.wrapper}>
          <Shadow useArt style={styles.buttonShadow}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={deleteAccountHandler}
                activeOpacity={0.75}
                style={styles.button}>
                <Text style={styles.buttonText}>{t('DeleteAccount')}</Text>
              </TouchableOpacity>
            </View>
          </Shadow>
          <Shadow useArt style={styles.buttonShadow}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={changePasswordHandler}
                activeOpacity={0.75}
                style={styles.button}>
                <Text style={styles.buttonText}>{t('ChangePassword')}</Text>
              </TouchableOpacity>
            </View>
          </Shadow>
        </View>
      </View>
      <View style={styles.returnButton}>
        <SubmitButton
          buttonText={t('Return')}
          onPress={() => navigation.navigate('Menu')}
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
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
  },
});

export default Profile;
