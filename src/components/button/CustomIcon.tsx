import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Variant = 'bigIconBox' | 'mediumIconBox' | 'smallIconBox';

interface Props {
  variant: Variant;
  iconName: string;
  color?: string;
}

const IconSize: Record<Variant, number> = {
  bigIconBox: 44,
  mediumIconBox: 36,
  smallIconBox: 28,
};

const CustomIcon: React.FC<Props> = ({variant, iconName, color}) => {
  return (
    <View style={styles.icon}>
      <Icon name={iconName} color={color} size={IconSize[variant]} />
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
