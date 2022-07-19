import React from 'react';
import {View, Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {useTranslation} from 'react-i18next';

const colors = new Colors();
const fonts = new Fonts();

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
          <Text style={styles.text}>{t('DeleteAccountText')}</Text>
          <View style={styles.buttonWrapper}>
            <Shadow useArt style={styles.buttonShadow}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={deleteAccountHandler}
                  activeOpacity={0.75}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{t('Yes')}</Text>
                </TouchableOpacity>
              </View>
            </Shadow>
            <Shadow useArt style={styles.buttonShadow}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={deleteAccountHandler}
                  activeOpacity={0.75}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{t('No')}</Text>
                </TouchableOpacity>
              </View>
            </Shadow>
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
  text: {
    textAlign: 'center',
    fontFamily: fonts.secondaryFont,
    fontSize: 20,
    color: colors.darkBlue,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: colors.lightBlue,
    height: 55,
    width: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 3, height: 3},
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.darkBlue,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: -2, height: 4},
    textShadowRadius: 10,
  },
});

export default DeleteAccountModal;
