import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  Pressable,
  Text,
} from 'react-native';
import {Formik, useFormik} from 'formik';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import SubmitButton from '../SubmitButton';
import * as Yup from 'yup';

const fonts = new Fonts();
const colors = new Colors();

interface FormValue {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
    },
  });

  return (
    <View style={styles.formBox}>
      <Formik<FormValue>
        initialValues={formik.initialValues}
        onSubmit={formik.submitForm}>
        <ScrollView style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              placeholder="Username"
              placeholderTextColor={colors.darkBlue}
              value={formik.values.username}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              placeholder="Email"
              placeholderTextColor={colors.darkBlue}
              value={formik.values.email}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Password"
              placeholderTextColor={colors.darkBlue}
              value={formik.values.password}
            />
          </View>
        </ScrollView>
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Privacy policy</Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <SubmitButton buttonText="CONFIRM" onPress={formik.handleSubmit} />
          </View>
        </View>
      </Modal>
      <SubmitButton buttonText="NEXT" onPress={() => setModalVisible(true)} />
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
    backgroundColor: colors.lightBlue,
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
});

export default SignUp;
