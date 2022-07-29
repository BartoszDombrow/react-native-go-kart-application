import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import SubmitButton from '../components/SubmitButton';
import colors from '../constants/Colors';
import Typography from '../typography/Typography';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {GameStackParams} from '../navigation/GameNav';
import {useTranslation} from 'react-i18next';

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
      <Icon
        name="arrow-undo-circle-sharp"
        style={styles.icon}
        onPress={() => navigationMenu.navigate('Menu')}
      />
      <Typography variant="bigTitle" style={styles.text}>
        {t('connectToYourGame')}
      </Typography>
      <FormInput
        onChangeText={formik.handleChange('code')}
        onBlur={formik.handleBlur('code')}
        value={formik.values.code}
        placeholder={t('code')}
        formikTouched={formik.touched.code}
        formikErrors={formik.errors.code}
        secureTextEntry={false}
      />
      <SubmitButton buttonText={t('connect')} onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.mediumBlue,
  },
  text: {
    marginTop: 50,
    marginBottom: 140,
  },
  icon: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 40,
    fontSize: 64,
  },
});

export default ConnectGame;
