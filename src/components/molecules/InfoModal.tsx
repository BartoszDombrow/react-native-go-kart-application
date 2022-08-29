import React from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet, View} from 'react-native';
import colors from '../../constants/Colors';
import CustomButton from '../atoms/CustomButton';
import Typography from '../atoms/Typography';

interface InfoModalProps {
  message: string;
  modalTitle: string;
  isVisible: boolean;
  onDismiss: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  message,
  modalTitle,
  isVisible,
  onDismiss,
}) => {
  const {t} = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onDismiss}
      statusBarTranslucent>
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Typography variant="smallTitle">{modalTitle}</Typography>
          </View>
          <Typography variant="basicText" style={styles.message}>
            {message}
          </Typography>
          <View style={styles.hideButton}>
            <CustomButton
              buttonText={t('hide')}
              buttonVariant="smallButton"
              onPress={() => {
                onDismiss();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 0.4,
    width: '90%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 50,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    color: colors.darkBlue,
    letterSpacing: 2,
  },
  hideButton: {
    paddingBottom: 16,
  },
});

export default InfoModal;
