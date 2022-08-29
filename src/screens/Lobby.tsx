import React, {useContext, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {GameStackParams} from '../navigation/GameNav';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import colors from '../constants/Colors';
import CustomButton from '../components/atoms/CustomButton';
import Typography from '../components/atoms/Typography';
import DriversList from '../components/organisms/DriversList';
import {useTranslation} from 'react-i18next';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import {StackNavigationProp} from '@react-navigation/stack';
import ParticipantsContext, {
  Participants,
} from '../context/ParticipantsProvider';
import InfoModal from '../components/molecules/InfoModal';
import UserContext from '../context/UserProvider';
import {accessToken, client} from '../api/client';
import axios from 'axios';

type GameScreenNav = CompositeNavigationProp<
  StackNavigationProp<GameStackParams>,
  StackNavigationProp<GameMenuStackParams>
>;

function GameScreen() {
  const navigation = useNavigation<GameScreenNav>();
  const {t} = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const disconnectKartHandler = () => {
    setIsModalVisible(visible => !visible);
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const errorModalHandler = () => {
    setIsErrorModalVisible(visible => !visible);
  };

  const {participants, setParticipants} = useContext(ParticipantsContext);
  const {user} = useContext(UserContext);

  const driversAmount =
    participants.filter(driver => driver.isActive === true).length === 0
      ? ''
      : ` (${participants.filter(driver => driver.isActive === true).length})`;

  const disconnectKart = async () => {
    const participantId = participants.find(
      ({userId}) => userId === user.id,
    )?.id;
    try {
      await client.patch(
        `/participants/${participantId}`,
        {
          carNumber: null,
          tagId: null,
          carCode: null,
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
    } catch (err) {
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
  };

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.driversContainer}>
          <Typography variant="smallTitle" style={styles.title}>
            {t('activeDrivers')}
            {driversAmount}
          </Typography>
          <View style={styles.driversList}>
            <DriversList
              displayDriverStatus={false}
              drivers={participants.filter(driver => driver.isActive === true)}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.raceButtons}>
            <CustomButton
              buttonVariant="smallButton"
              buttonText={t('chooseCar')}
              onPress={() => {
                navigation.navigate('ChooseCar');
              }}
            />
            <CustomButton
              buttonVariant="smallButton"
              buttonText={t('race')}
              onPress={() => {
                navigation.navigate('Race', {
                  drivers: participants.filter(
                    driver => driver.isActive === true,
                  ),
                });
              }}
            />
            <CustomButton
              buttonVariant="smallButton"
              buttonText={t('disconnectKart')}
              onPress={disconnectKartHandler}
            />
          </View>
          <CustomButton
            buttonVariant="tinyButton"
            buttonText={''}
            onPress={() => {
              navigation.navigate('DriverScreen', {
                driver: participants.filter(
                  driver => driver.userId === user.id,
                )[0],
              });
            }}
          />
          <CustomButton
            buttonVariant="smallButton"
            buttonText={t('exit')}
            onPress={() => {
              navigation.navigate('ConnectLobby');
            }}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={disconnectKartHandler}
        visible={isModalVisible}
        supportedOrientations={['landscape']}
        statusBarTranslucent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Typography variant="modalText" style={styles.text}>
              {t('disconnectKartDescription')}
            </Typography>
            <View style={styles.buttonWrapper}>
              <CustomButton
                buttonText={t('yes')}
                buttonVariant="tinyButton"
                onPress={() => {
                  disconnectKart();
                  disconnectKartHandler();
                  //navigation.navigate('ConnectLobby');
                }}
              />
              <CustomButton
                buttonText={t('no')}
                buttonVariant="tinyButton"
                onPress={disconnectKartHandler}
              />
            </View>
          </View>
        </View>
      </Modal>
      <InfoModal
        message={errorMessage}
        modalTitle={t('error')}
        isVisible={isErrorModalVisible}
        onDismiss={() => {
          errorModalHandler();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.mediumBlue,
  },
  driversContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driversList: {
    flex: 1,
    width: 300,
    paddingBottom: 16,
  },
  title: {
    paddingVertical: 20,
  },
  buttonsContainer: {
    padding: 16,
  },
  raceButtons: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    opacity: 0.98,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    width: 400,
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
    padding: 32,
  },
  text: {
    paddingBottom: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
});

export default GameScreen;
