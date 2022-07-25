import React from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type Variant =
  | 'bigTitle'
  | 'mediumTitle'
  | 'smallTitle'
  | 'bigButtonText'
  | 'mediumButtonText'
  | 'smallButtonText'
  | 'basicText'
  | 'spanPrimaryBold'
  | 'spanBold'
  | 'span'
  | 'modalText';

interface Props extends TextProps {
  variant?: Variant;
}

const Typography: React.FC<Props> = ({variant = 'basicText', ...props}) => (
  <Text {...props} style={[styles[variant], props.style]} />
);

const fonts = new Fonts();
const colors = new Colors();

const styles = StyleSheet.create<Record<Variant, TextStyle>>({
  bigTitle: {
    fontSize: 52,
    fontFamily: fonts.primaryFont,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 5,
  },
  mediumTitle: {
    fontSize: 44,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 10,
  },
  smallTitle: {
    fontSize: 36,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 10,
  },
  bigButtonText: {
    color: colors.darkBlue,
    fontSize: 36,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 10,
    padding: 4,
  },
  mediumButtonText: {
    color: colors.white,
    fontSize: 28,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    padding: 4,
  },
  smallButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primaryFont,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    padding: 4,
  },
  basicText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: fonts.secondaryFont,
  },
  spanPrimaryBold: {
    fontFamily: fonts.primaryFont,
    color: colors.white,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  spanBold: {
    fontFamily: fonts.secondaryFont,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  span: {
    fontFamily: fonts.secondaryFont,
    fontSize: 16,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  modalText: {
    textAlign: 'center',
    fontFamily: fonts.secondaryFont,
    fontSize: 20,
    color: colors.darkBlue,
  },
});

export default Typography;