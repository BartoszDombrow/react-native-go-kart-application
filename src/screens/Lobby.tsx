import React, {useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {GameStackParams} from '../navigation/GameNav';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import colors from '../constants/Colors';
import CustomButton from '../components/atoms/CustomButton';
import Typography from '../components/atoms/Typography';
import DriversList from '../components/organisms/DriversList';
import {useTranslation} from 'react-i18next';
import {GameMenuStackParams} from '../navigation/GameMenuNav';
import drivers from '../constants/DriversDATA.json';
import {StackNavigationProp} from '@react-navigation/stack';

type GameScreenNav = CompositeNavigationProp<
  StackNavigationProp<GameStackParams>,
  StackNavigationProp<GameMenuStackParams>
>;

function GameScreen() {
  const navigation = useNavigation<GameScreenNav>();
  const {t} = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const leaveSessionHandler = () => {
    setIsModalVisible(visible => !visible);
  };

  const driversAmount = drivers.length === 0 ? '' : ` (${drivers.length})`;

  return (
    <>
      <View style={styles.screen}>
        <View style={styles.driversContainer}>
          <Typography variant="smallTitle" style={styles.title}>
            {t('activeDrivers')}
            {driversAmount}
          </Typography>
          <View style={styles.driversList}>
            <DriversList screenType="Lobby" />
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
                navigation.navigate('Race');
              }}
            />
            <CustomButton
              buttonVariant="smallButton"
              buttonText={t('leaveSession')}
              onPress={leaveSessionHandler}
            />
          </View>
          <CustomButton
            buttonVariant="tinyButton"
            buttonText={''}
            onPress={() => {
              navigation.navigate('DriverScreen');
            }}
          />
          <CustomButton
            buttonVariant="smallButton"
            buttonText={t('exit')}
            onPress={() => {
              navigation.navigate('ConnectGame');
            }}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={leaveSessionHandler}
        visible={isModalVisible}
        supportedOrientations={['landscape']}
        statusBarTranslucent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Typography variant="modalText" style={styles.text}>
              {t('leaveSessionDescription')}
            </Typography>
            <View style={styles.buttonWrapper}>
              <CustomButton
                buttonText={t('yes')}
                buttonVariant="tinyButton"
                onPress={() => {
                  leaveSessionHandler();
                  navigation.navigate('ConnectGame');
                }}
              />
              <CustomButton
                buttonText={t('no')}
                buttonVariant="tinyButton"
                onPress={leaveSessionHandler}
              />
            </View>
          </View>
        </View>
      </Modal>
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
