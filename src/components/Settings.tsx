import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SubmitButton from './SubmitButton';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/StackNav';

const colors = new Colors();

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
        <TouchableOpacity onPress={handleVisableDismiss}>
          <Icon name="close-circle" color={colors.lightBlue} size={40} />
        </TouchableOpacity>
        <View>
          <SubmitButton buttonText='Profile' onPress={() => {}}/>
          <SubmitButton buttonText='Volume' onPress={() => {}}/>
          <SubmitButton buttonText='Language' onPress={() => {}}/>
        </View>
        <View>
          <SubmitButton
            buttonText="LOGOUT"
            onPress={() => {
              navigation.navigate('Auth');
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  button: {
    width: 50
  }
});

export default Settings;
