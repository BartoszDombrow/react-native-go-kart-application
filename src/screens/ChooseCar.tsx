import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import FormInput from '../components/FormInput';
import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';

interface FormValue {
  carCode: string;
}

const ChooseCar = () => {
  const {t} = useTranslation();

  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();

  const formik = useFormik<FormValue>({
    initialValues: {
      carCode: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      carCode: Yup.string().required(t('yupValidation.requiredField')),
    }),
    onSubmit: () => {
      gameNavigation.navigate('Lobby');
    },
  });

  return (
    <View style={styles.screen}>
      <View>
        <TouchableOpacity
          onPress={() => gameNavigation.navigate('Lobby')}
          style={styles.icon}>
          <Icon
            name="arrow-undo-circle-sharp"
            size={60}
            color={colors.lightBlue}
          />
        </TouchableOpacity>
        <Typography variant="smallTitle">{t('chooseCar')}</Typography>
      </View>
      <View style={styles.formContainer}>
        <FormInput
          onChangeText={formik.handleChange('carCode')}
          onBlur={formik.handleBlur('carCode')}
          value={formik.values.carCode}
          placeholder={t('carCode')}
          formikTouched={formik.touched.carCode}
          formikErrors={formik.errors.carCode}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={t('confirm').toUpperCase()}
          buttonVariant="mediumButton"
          onPress={formik.handleSubmit}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
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
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
});

export default ChooseCar;
