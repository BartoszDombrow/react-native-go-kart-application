import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  Text,
} from 'react-native';
import {useFormik} from 'formik';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import SubmitButton from '../SubmitButton';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

const fonts = new Fonts();
const colors = new Colors();

interface FormValue {
  username: string;
  email: string;
  password: string;
  privacyPolicy: boolean;
}

const SignUp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const formik = useFormik<FormValue>({
    initialValues: {
      username: '',
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
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      privacyPolicy: Yup.boolean()
        .oneOf([true], 'The privacy policy must be accepted.')
        .required('Required'),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
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
    <View style={styles.formBox}>
      <ScrollView style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Shadow inner useArt style={styles.shadow}>
            <TextInput
              returnKeyType="go"
              style={styles.textInput}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              placeholder="Username"
              placeholderTextColor={colors.darkBlue}
              value={formik.values.username}
            />
          </Shadow>

          {formik.touched.username && formik.errors.username && (
            <Text style={styles.errorMessage}>{formik.errors.username}</Text>
          )}
          <Shadow inner useArt style={styles.shadow}>
            <TextInput
              returnKeyType="next"
              style={styles.textInput}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              placeholder="Email"
              placeholderTextColor={colors.darkBlue}
              value={formik.values.email}
            />
          </Shadow>
          {formik.touched.email && formik.errors.email && (
            <Text style={styles.errorMessage}>{formik.errors.email}</Text>
          )}
          <Shadow inner useArt style={styles.shadow}>
            <TextInput
              returnKeyType="done"
              secureTextEntry
              style={styles.textInput}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Password"
              placeholderTextColor={colors.darkBlue}
              value={formik.values.password}
            />
          </Shadow>

          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorMessage}>{formik.errors.password}</Text>
          )}
        </View>
        <View>
          <View style={styles.checkBoxWrapper}>
            <CheckBox
              value={formik.values.privacyPolicy}
              disabled={false}
              onValueChange={value =>
                formik.setFieldValue('privacyPolicy', value)
              }
            />

            <Text style={styles.checkBoxText}>
              Accept{' '}
              <Text onPress={handleVisableDismiss} style={styles.textSpan}>
                privacy policy
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleVisableDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Privacy policy</Text>

            <SubmitButton buttonText="EXIT" onPress={handleVisableDismiss} />
          </View>
        </View>
      </Modal>
      <SubmitButton buttonText="START" onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    height: '60%',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    height: 50,
    textAlign: 'center',
    marginVertical: 15,
    borderRadius: 15,
    fontFamily: fonts.secondaryFont,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkBlue,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 6,
  },
  button: {
    marginTop: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBlue,
    padding: 35,
    alignItems: 'center',
    opacity: 0.95,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  checkBoxWrapper: {
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
  errorMessage: {color: colors.white, fontSize: 14},
  shadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowColor: '#000000',
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 300,
    height: 60,
    marginVertical: 10,
  },
});

export default SignUp;
