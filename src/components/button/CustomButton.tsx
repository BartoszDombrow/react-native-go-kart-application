import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Typography from '../../typography/Typography';

import CustomIcon from './CustomIcon';
import CustomImage from './CustomImage';
import colors from '../../constants/Colors';

type Variant = 'bigButton' | 'mediumButton' | 'smallButton' | 'tinyButton';

interface Props {
  buttonVariant: Variant;
  buttonText: string;
  onPress: () => void;
  iconName?: string;
  imageSource?: ImageSourcePropType;
  isSelected?: boolean;
}

interface ButtonVariantConfig {
  buttonContainer: StyleProp<ViewStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  textBoxStyle: StyleProp<ViewStyle>;
  textVariant: string;
}

const CustomButton: React.FC<Props> = ({
  buttonVariant,
  buttonText,
  onPress,
  iconName,
  imageSource,
  isSelected,
}) => {
  return (
    <View style={[styles.button, styles[buttonVariant]]}>
      <View style={variantsConfig[buttonVariant].buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          style={[
            {backgroundColor: isSelected ? colors.darkBlue : colors.white},
            variantsConfig[buttonVariant].buttonStyle,
            styles.button,
          ]}
          onPress={onPress}>
          {iconName ? (
            <CustomIcon
              name={iconName}
              variant={
                buttonVariant === 'bigButton'
                  ? 'bigIconBox'
                  : buttonVariant === 'mediumButton'
                  ? 'mediumIconBox'
                  : 'smallIconBox'
              }
              color={isSelected ? colors.white : colors.darkBlue}
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
          <View style={variantsConfig[buttonVariant].textBoxStyle}>
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
    shadowOpacity: 0.35,
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

const variantsConfig: Record<Variant, ButtonVariantConfig> = {
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

export default CustomButton;
