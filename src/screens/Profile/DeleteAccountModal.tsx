import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import colors from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import Typography from '../../components/atoms/Typography';
import CustomButton from '../../components/atoms/CustomButton';

interface Props {
  deleteAccountVisible: boolean;
  deleteAccountHandler: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({
  deleteAccountVisible,
  deleteAccountHandler,
}) => {
  const {t} = useTranslation();

  return (
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
              onPress={deleteAccountHandler}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    opacity: 0.98,
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