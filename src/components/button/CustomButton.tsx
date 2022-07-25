import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import Typography from '../../typography/Typography';

import CustomIcon from './CustomIcon';
import CustomImage from './CustomImage';
import Colors from '../../constants/Colors';
const colors = new Colors();

type Variant = 'bigButton' | 'mediumButton' | 'smallButton' | 'tinyButton';

interface Props {
  buttonVariant: Variant;
  buttonText: string;
  onPress: () => void;
  iconName?: string;
  imageSource?: ImageSourcePropType;
  isSelected?: boolean;
}

const CustomButton: React.FC<Props> = ({
  buttonVariant,
  buttonText,
  onPress,
  iconName,
  imageSource,
  isSelected,
}) => {
  const ButtonStyles = {
    bigButton: {
      buttonContainer: styles.bigButtonContainer,
      buttonStyle: styles.bigButton,
      textBoxStyle: styles.bigTextBox,
      textVariant: 'bigButtonText',
    },
    mediumButton: {
      buttonContainer: styles.mediumButtonContainer,
      buttonStyle: styles.mediumButton,
      textBoxStyle: styles.mediumTextBox,
      textVariant: 'mediumButtonText',
    },
    smallButton: {
      buttonContainer: styles.smallButtonContainer,
      buttonStyle: styles.smallButton,
      textBoxStyle: styles.smallTextBox,
      textVariant: 'smallButtonText',
    },
    tinyButton: {
      buttonContainer: styles.tinyButtonContainer,
      buttonStyle: styles.tinyButton,
      textBoxStyle: styles.tinyTextBox,
      textVariant: 'smallButtonText',
    },
  };

  return (
    <View style={[styles.button, styles[buttonVariant]]}>
      <View style={ButtonStyles[buttonVariant].buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={[
            {backgroundColor: isSelected ? colors.darkBlue : colors.white},
            ButtonStyles[buttonVariant].buttonStyle,
            styles.button,
          ]}
          onPress={onPress}>
          {iconName ? (
            <CustomIcon
              iconName={iconName}
              variant={
                buttonVariant === 'bigButton'
                  ? 'bigIconBox'
                  : buttonVariant === 'mediumButton'
                  ? 'mediumIconBox'
                  : 'smallIconBox'
              }
              isSelected={isSelected}
            />
          ) : null}
          {imageSource ? (
            <CustomImage
              imageSource={imageSource}
              variant={
                buttonVariant === 'bigButton'
                  ? 'bigImageBox'
                  : buttonVariant === 'mediumButton'
                  ? 'mediumImageBox'
                  : 'smallImageBox'
              }
            />
          ) : null}
          <View style={ButtonStyles[buttonVariant].textBoxStyle}>
            <Typography
              variant={
                buttonVariant === 'bigButton'
                  ? 'bigButtonText'
                  : buttonVariant === 'mediumButton'
                  ? 'mediumButtonText'
                  : 'smallButtonText'
              }
              style={{color: isSelected ? colors.white : colors.darkBlue}}>
              {buttonText}
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: {width: 3, height: 3},
    elevation: 10,
    padding: 4,
  },
  bigButton: {
    width: 300,
    minHeight: 80,
  },
  bigButtonContainer: {
    width: 300,
    minHeight: 80,
  },
  bigTextBox: {
    flex: 0.75,
  },
  mediumButton: {
    width: 320,
    minHeight: 60,
  },
  mediumButtonContainer: {
    width: 320,
    minHeight: 60,
  },
  mediumTextBox: {
    flex: 0.75,
  },
  smallButton: {
    width: 180,
    minHeight: 50,
    shadowColor: '#000000',
  },
  smallButtonContainer: {
    width: 180,
    minheight: 50,
  },
  smallTextBox: {
    flex: 0.8,
  },
  tinyButton: {
    width: 120,
    minHeight: 50,
  },
  tinyButtonContainer: {
    width: 120,
    minheight: 50,
  },
  tinyTextBox: {
    flex: 0.8,
  },
  isSelected: {
    backgroundColor: colors.darkBlue,
  },
});

export default CustomButton;
