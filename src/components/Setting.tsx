import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SubmitButton from './SubmitButton';
import Colors from '../constants/Colors';

const colors = new Colors();

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleVisableDismiss = () => {
    setModalVisible(visible => !visible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleVisableDismiss}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity>
            <Icon name='close-circle' color={colors.lightBlue}/>
          </TouchableOpacity>
          <Text style={styles.modalText}>Privacy policy</Text>

          <SubmitButton buttonText="LOGOUT" onPress={handleVisableDismiss} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.lightBlue,
    padding: 35,
    alignItems: 'center',
    opacity: 0.95,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Settings;
