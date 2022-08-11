import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, FlatList, Dimensions, Animated} from 'react-native';

import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import colors from '../../constants/Colors';

import {useTranslation} from 'react-i18next';
import SwipeButton from '../../components/molecules/SwipeButton';

const SLIDE_ANIMATION_DURATION = 700;

interface AuthFormProps {
  setIsSignUpFormVisible: (status: boolean) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({setIsSignUpFormVisible}) => {
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const {t} = useTranslation();

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
    });
    if (index) {
      setIsSignUpFormVisible(false);
    } else {
      setIsSignUpFormVisible(true);
    }
  }, [index, setIsSignUpFormVisible]);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideLeft = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('screen').width,
      duration: SLIDE_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const slideRight = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: SLIDE_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.formContainer}>
      <View>
        <SwipeButton
          width={300}
          height={50}
          buttonWidth={140}
          buttonHeight={40}
          textLeft={t('signIn')}
          textRight={t('signUp')}
          onEndSwipe={status => {
            setIndex(status);
            if (status) {
              slideLeft();
            } else {
              slideRight();
            }
          }}
          color={colors.white}
          textOnColor={colors.darkBlue}
          textOffColor={colors.darkBlue}
        />
      </View>
      <View style={styles.formScreen}>
        <Animated.View
          style={{
            transform: [{translateX: slideAnim}],
            ...styles.animatedView,
          }}>
          <View style={styles.signInBox}>
            <LoginForm />
          </View>
          <View style={styles.signUpBox}>
            <SignUp />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  formScreen: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
  signInBox: {
    width: Dimensions.get('window').width,
  },
  signUpBox: {
    width: Dimensions.get('window').width,
  },
});

export default AuthForm;
