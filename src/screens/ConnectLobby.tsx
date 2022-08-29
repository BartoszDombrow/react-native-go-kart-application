import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/atoms/FormInput';
import colors from '../constants/Colors';
import Typography from '../components/atoms/Typography';
import Icon from 'react-native-vector-icons/Ionicons';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {MenuStackParams} from '../navigation/MenuNav';
import {GameStackParams} from '../navigation/GameNav';
import {useTranslation} from 'react-i18next';
import CustomButton from '../components/atoms/CustomButton';
import {accessToken, client} from '../api/client';
import axios from 'axios';
import InfoModal from '../components/molecules/InfoModal';
import UserContext from '../context/UserProvider';
import ParticipantsContext, {
  Participants,
} from '../context/ParticipantsProvider';
import {StackNavigationProp} from '@react-navigation/stack';

interface FormValue {
  code: string;
}

type RaceNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MenuStackParams>,
  StackNavigationProp<GameStackParams>
>;

const ConnectGame = () => {
  const {t} = useTranslation();
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const {user} = useContext(UserContext);
  const {setParticipants} = useContext(ParticipantsContext);

  const navigation = useNavigation<RaceNavigationProp>();

  const formik = useFormik<FormValue>({
    initialValues: {
      code: '',
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: Yup.object({
      code: Yup.string()
        .min(6, t('sessionValidation.minCode', {length: 6}))
        .max(6, t('sessionValidation.maxCode', {length: 6}))
        .required(t('requiredCode')),
    }),
    onSubmit: async values => {
      let sessionId = null;
      try {
        const participantsResponse = await client.get<Participants[]>(
          '/participants',
          {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
          },
        );

        if (
          participantsResponse.data.filter(
            session =>
              session.sessionCode === values.code && session.userId === user.id,
          ).length === 0
        ) {
          const postResponse = await client.post(
            '/participants',
            {
              sessionCode: values.code,
              userId: user.id,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              withCredentials: true,
            },
          );
          sessionId = postResponse.data.sessionId;
        } else {
          sessionId = participantsResponse.data.filter(
            session =>
              session.sessionCode === values.code && session.userId === user.id,
          )[0].sessionId;
        }

        const participants = await client.get<Participants[]>('/participants', {
          params: {
            sessionId,
          },
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        });
        setParticipants(participants.data);

        navigation.navigate('GameMenuNav');
      } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            setErrorMessage(t('serverError.noServerResponse'));
          } else if (err.response?.status === 400) {
            setErrorMessage(t('serverError.badRequest'));
          } else if (err.response?.status === 404) {
            setErrorMessage(t('sessionValidation.badSession'));
          } else {
            setErrorMessage(t('serverError.unexpectedError'));
          }
        } else {
          setErrorMessage(t('serverError.unexpectedError'));
        }
        errorModalHandler();
      }
    },
  });

  const errorModalHandler = () => {
    setIsErrorModalVisible(visible => !visible);
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
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
          buttonText={t('connect')}
          buttonVariant="bigButton"
          onPress={formik.handleSubmit}
        />
      </View>
      <InfoModal
        message={errorMessage}
        modalTitle={t('error')}
        isVisible={isErrorModalVisible}
        onDismiss={() => {
          errorModalHandler();
        }}
      />
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
    height: 128,
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
