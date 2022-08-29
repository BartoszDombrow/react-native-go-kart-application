import React, {useState} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import colors from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import Typography from '../../components/atoms/Typography';
import CustomButton from '../../components/atoms/CustomButton';
import {accessToken, client} from '../../api/client';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/StackNav';
import InfoModal from '../../components/molecules/InfoModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  deleteAccountVisible: boolean;
  deleteAccountHandler: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({
  deleteAccountVisible,
  deleteAccountHandler,
}) => {
  const {t} = useTranslation();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const errorModalHandler = () => {
    isErrorModalVisible
      ? setIsErrorModalVisible(false)
      : setIsErrorModalVisible(true);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={deleteAccountHandler}
        visible={deleteAccountVisible}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <Typography variant="modalText" style={styles.text}>
              {t('deleteAccountText')}
            </Typography>
            <View style={styles.buttonWrapper}>
              <CustomButton
                buttonText={t('yes')}
                buttonVariant="tinyButton"
                onPress={async () => {
                  try {
                    await client.delete('/users', {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                      },
                      withCredentials: true,
                    });
                    AsyncStorage.removeItem('accessToken');
                    deleteAccountHandler();
                    navigation.navigate('Auth');
                  } catch {
                    deleteAccountHandler();
                    setIsErrorModalVisible(true);
                  }
                }}
              />
              <CustomButton
                buttonText={t('no')}
                buttonVariant="tinyButton"
                onPress={deleteAccountHandler}
              />
            </View>
          </View>
        </View>
      </Modal>
      <InfoModal
        modalTitle={t('error')}
        isVisible={isErrorModalVisible}
        message={t('serverError.unexpectedError')}
        onDismiss={errorModalHandler}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '95%',
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
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

export default DeleteAccountModal;
