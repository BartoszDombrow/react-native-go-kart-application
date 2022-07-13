import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../constants/Fonts';
import SubmitButton from './SubmitButton';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../navigation/StackNav';
import MainButton from './MainButton';
import {Shadow} from 'react-native-neomorph-shadows-fixes';

const colors = new Colors();
const fonts = new Fonts();

interface Props {
  isVisible: boolean;
  settingsHandler: () => void;
}

const Settings: React.FC<Props> = ({isVisible, settingsHandler}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={settingsHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.closeButtonContainer}>
          <Shadow useArt style={styles.shadow}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={settingsHandler}>
              <Icon name="close-circle" size={60} />
            </TouchableOpacity>
          </Shadow>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.buttonBox}>
            <MainButton
              buttonText="Profile"
              onPress={() => {}}
              iconName="profile"
            />
          </View>
          <View style={styles.buttonBox}>
            <MainButton
              buttonText="Volume"
              onPress={() => {}}
              iconName="volume"
            />
          </View>
          <View style={styles.buttonBox}>
            <MainButton
              buttonText="Language"
              onPress={() => {}}
              iconName="language"
            />
          </View>
        </View>
        <View style={styles.submitButtonContainer}>
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
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  closeButtonContainer: {
    paddingTop: 30,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  shadow: {
    height: 60,
    width: 60,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  closeButton: {
    flex: 1,
    zIndex: 1,
  },
  buttonsContainer: {
    alignItems: 'center',
    flex: 0.9,
  },
  title: {
    height: 110,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: fonts.primaryFont,
    color: colors.white,
    fontSize: 48,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 5},
    textShadowRadius: 5,
    textAlign: 'center',
  },
  buttonBox: {
    paddingVertical: 20,
  },
  submitButtonContainer: {
    alignItems: 'center',
  },
});

export default Settings;
