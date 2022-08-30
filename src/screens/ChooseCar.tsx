import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/Colors';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import FormInput from '../components/atoms/FormInput';
import Typography from '../components/atoms/Typography';
import CustomButton from '../components/atoms/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {accessToken, client} from '../api/client';
import InfoModal from '../components/molecules/InfoModal';
import ParticipantsContext, {
  Participants,
} from '../context/ParticipantsProvider';
import UserContext from '../context/UserProvider';

interface FormValue {
  carCode: string;
}

const ChooseCar = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const {t} = useTranslation();

  const gameNavigation =
    useNavigation<NativeStackNavigationProp<GameMenuStackParams>>();

  const {participants, setParticipants} = useContext(ParticipantsContext);

  const {user} = useContext(UserContext);

  const participantId = participants.find(({userId}) => userId === user.id)?.id;

  const formik = useFormik<FormValue>({
    initialValues: {
      carCode: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      carCode: Yup.string().required(t('yupValidation.requiredField')),
    }),
    onSubmit: async values => {
      try {
        await client.patch(
          `/participants/${participantId}`,
          {
            carCode: values.carCode,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );

        const participantsResponse = await client.get<Participants[]>(
          '/participants',
          {
            params: {
              sessionId: participants.filter(
                session => session.id === participants[0].id,
              )[0].sessionId,
            },
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
          },
        );

        setParticipants(participantsResponse.data);
        gameNavigation.navigate('Lobby');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (!err?.response) {
            setErrorMessage(t('serverError.noServerResponse'));
            errorModalHandler();
          } else if (err.response?.status === 400) {
            setErrorMessage(t('serverError.badRequest'));
            errorModalHandler();
          } else if (err.response?.status === 404) {
            setErrorMessage(t('carConnectionError.noCarCode'));
            errorModalHandler();
          } else if (err.response?.status === 409) {
            setErrorMessage(t('carConnectionError.occupiedCar'));
            errorModalHandler();
          } else {
            setErrorMessage(t('serverError.unexpectedError'));
            errorModalHandler();
          }
        } else {
          setErrorMessage(t('serverError.unexpectedError'));
          errorModalHandler();
        }
      }
    },
  });

  const errorModalHandler = () => {
    setIsErrorModalVisible(visible => !visible);
  };
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
          buttonText={t('confirm')}
          buttonVariant="mediumButton"
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
