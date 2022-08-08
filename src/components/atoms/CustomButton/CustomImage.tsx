import React from 'react';
import {View, Image, StyleSheet, ImageSourcePropType} from 'react-native';

import colors from '../../../constants/Colors';

type Variant = 'bigImageBox' | 'mediumImageBox' | 'smallImageBox';

interface Props {
  variant: Variant;
  imageSource: ImageSourcePropType;
}

const CustomImage: React.FC<Props> = ({
  variant = 'mediumImageBox',
  imageSource,
}) => {
  const ImageStyle = {
    bigImageBox: styles.bigImage,
    mediumImageBox: styles.mediumImage,
    smallImageBox: styles.smallImage,
  };

  return (
    <View style={styles[variant]}>
      <Image source={imageSource} style={ImageStyle[variant]} />
    </View>
  );
};

const styles = StyleSheet.create({
  bigImageBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
  mediumImageBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediumImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
  smallImageBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.darkBlue,
  },
});

export default CustomImage;
