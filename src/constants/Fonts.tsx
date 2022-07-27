import {Platform} from 'react-native';

const fonts = {
  primaryFont: Platform.OS === 'ios' ? 'TitanOne' : 'TitanOne-Regular',
  secondaryFont: 'RobotoMono-Regular',
};

export default fonts;
