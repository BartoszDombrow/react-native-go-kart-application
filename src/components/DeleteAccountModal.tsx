import React from 'react';
import {View, Modal, StyleSheet, Text} from 'react-native';
import Colors from '../constants/Colors';
import SubmitButton from './SubmitButton';

const colors = new Colors();

interface Props {
  deleteAccountVisible: boolean;
  deleteAccountHandler: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({
  deleteAccountVisible,
  deleteAccountHandler,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={deleteAccountHandler}
      visible={deleteAccountVisible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text>Jesteś w delete account</Text>
          <SubmitButton buttonText="EXIT" onPress={deleteAccountHandler} />
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
    opacity: 0.9,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '95%',
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
  },
});

export default DeleteAccountModal;
