import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Modal, Text} from 'react-native';
import {useFormik} from 'formik';
import Colors from '../../constants/Colors';
import SubmitButton from '../SubmitButton';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../FormInput';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';
import Fonts from '../../constants/Fonts';
import {ScrollView} from 'react-native-gesture-handler';

const colors = new Colors();
const fonts = new Fonts();

interface FormValue {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  privacyPolicy: boolean;
}

const SignUp = () => {
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
      //Alert.alert(JSON.stringify(values));
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
              <View style={{alignItems: 'center'}}>
                <FormInput
                  onChangeText={formik.handleChange('username')}
                  onBlur={formik.handleBlur('username')}
                  value={formik.values.username}
                  placeholder="Username"
                  formikTouched={formik.touched.username}
                  formikErrors={formik.errors.username}
                />
                <FormInput
                  onChangeText={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                  value={formik.values.firstname}
                  placeholder="Firstname"
                  formikTouched={formik.touched.firstname}
                  formikErrors={formik.errors.firstname}
                />
                <FormInput
                  onChangeText={formik.handleChange('lastname')}
                  onBlur={formik.handleBlur('lastname')}
                  value={formik.values.lastname}
                  placeholder="Lastname"
                  formikTouched={formik.touched.lastname}
                  formikErrors={formik.errors.lastname}
                />
                <FormInput
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.email}
                  placeholder="Email"
                  formikTouched={formik.touched.email}
                  formikErrors={formik.errors.email}
                />
                <FormInput
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  value={formik.values.password}
                  placeholder="Password"
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
              />
            </View>

            <Text style={styles.checkBoxText}>
              Accept{' '}
              <Text onPress={handleVisableDismiss} style={styles.textSpan}>
                privacy policy
              </Text>
            </Text>
          </View>
        </View>

        <SubmitButton buttonText="START" onPress={formik.handleSubmit} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleVisableDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Privacy policy</Text>
            <View style={styles.modalText}></View>
            <View style={styles.modalButton}>
              <SubmitButton buttonText="EXIT" onPress={handleVisableDismiss} />
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
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    fontSize: 32,
    height: 150,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 10,
    paddingVertical: 50,
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
  checkBoxText: {
    fontSize: 18,
    color: colors.white,
  },
  textSpan: {
    color: colors.lightBlue,
    fontWeight: 'bold',
  },
});

export default SignUp;
