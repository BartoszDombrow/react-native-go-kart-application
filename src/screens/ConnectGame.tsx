import React from 'react';
import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import colors from '../constants/Colors';
import Typography from '../typography/Typography';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {GameStackParams} from '../navigation/GameNav';
import {useTranslation} from 'react-i18next';
import CustomButton from '../components/button/CustomButton';

interface FormValue {
  code: string;
}

const ConnectGame = () => {
  const {t} = useTranslation();

  const navigationMenu =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const navigationGame =
    useNavigation<NativeStackNavigationProp<GameStackParams>>();

  const formik = useFormik<FormValue>({
    initialValues: {
      code: '',
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: Yup.object({
      code: Yup.string()
        .min(8, t('minCode'))
        .max(8, t('maxCode'))
        .required(t('requiredCode')),
    }),
    onSubmit: values => {
      Alert.alert(JSON.stringify(values));
      navigationGame.navigate('GameMenuNav');
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigationMenu.navigate('Menu')}
          style={styles.icon}>
          <Icon
            name="arrow-undo-circle-sharp"
            size={60}
            color={colors.lightBlue}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Typography variant="mediumTitle" style={styles.text}>
            {t('joinToSession')}
          </Typography>
        </View>
      </View>
      <View style={styles.formContainer}>
        <FormInput
          onChangeText={formik.handleChange('code')}
          onBlur={formik.handleBlur('code')}
          value={formik.values.code}
          placeholder={t('code')}
          formikTouched={formik.touched.code}
          formikErrors={formik.errors.code}
          secureTextEntry={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={t('connect').toUpperCase()}
          buttonVariant="bigButton"
          onPress={formik.handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  icon: {
    marginLeft: 20,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 10,
    elevation: 22,
    borderRadius: 30,
    width: 60,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    textAlign: 'center',
    width: '80%',
    paddingVertical: 10,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConnectGame;
