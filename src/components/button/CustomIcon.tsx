import React from 'react';
import {View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/Colors';
const colors = new Colors();

type Variant = 'bigIconBox' | 'mediumIconBox' | 'smallIconBox';

interface Props {
  variant: Variant;
  iconName: string;
  isSelected?: boolean;
}

const CustomIcon: React.FC<Props> = ({
  variant = 'mediumIconBox',
  iconName,
  isSelected,
}) => {
  const IconSize = {
    bigIconBox: 44,
    mediumIconBox: 36,
    smallIconBox: 28,
  };

  const iconsArray = [
    {
      name: 'profile',
      icon: (
        <Icon
          name={Platform.OS === 'ios' ? 'ios-person-sharp' : 'md-person-sharp'}
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
    {
      name: 'volume',
      icon: (
        <Icon
          name="volume-high"
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
    {
      name: 'language',
      icon: (
        <Icon
          name="language"
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
    {
      name: 'start',
      icon: (
        <Icon
          name="play"
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
    {
      name: 'ranking',
      icon: (
        <Icon
          name="trophy"
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
    {
      name: 'statistics',
      icon: (
        <Icon
          name="stats-chart"
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
    {
      name: 'team',
      icon: (
        <Icon
          name="people-sharp"
          color={isSelected ? colors.white : colors.darkBlue}
          size={IconSize[variant]}
        />
      ),
    },
  ];

  return <View>{iconsArray.find(icon => icon.name === iconName)?.icon}</View>;
};

export default CustomIcon;
