import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/Ionicons';

type Variant = 'bigIconBox' | 'mediumIconBox' | 'smallIconBox';

interface Props extends IconProps {
  variant: Variant;
}

const IconSize: Record<Variant, number> = {
  bigIconBox: 44,
  mediumIconBox: 36,
  smallIconBox: 28,
};

const CustomIcon: React.FC<Props> = ({variant, ...iconProps}) => {
  return (
    <View style={styles.icon}>
      <Icon size={IconSize[variant]} {...iconProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});

export default CustomIcon;
