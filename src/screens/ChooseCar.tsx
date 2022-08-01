import React from 'react';
import {View, StyleSheet} from 'react-native';
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
    <View style={styles.container}>
      <Typography variant="smallTitle">{t('chooseCar')}</Typography>
      <FormInput
        onChangeText={formik.handleChange('carCode')}
        onBlur={formik.handleBlur('carCode')}
        value={formik.values.carCode}
        placeholder={t('carCode')}
        formikTouched={formik.touched.carCode}
        formikErrors={formik.errors.carCode}
      />
      <CustomButton
        buttonText={t('confirm')}
        buttonVariant="mediumButton"
        onPress={formik.handleSubmit}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ChooseCar;
