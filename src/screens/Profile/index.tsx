import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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

interface FormValue {
  username: string;
  email: string;
}

const Profile = () => {
  const {t} = useTranslation();

  const formik = useFormik<FormValue>({
    initialValues: {
      username: '',
      email: '',
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="mediumTitle" style={styles.title}>
          {t('profile')}
        </Typography>
      </View>
      <View style={styles.content}>
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
              buttonText={t('deleteAccount')}
              buttonVariant="smallButton"
              onPress={deleteAccountHandler}
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
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 10,
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
});

export default Profile;
