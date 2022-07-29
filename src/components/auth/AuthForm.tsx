import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import colors from '../../constants/Colors';

import {useTranslation} from 'react-i18next';
import SwipeButton from '../SwipeButton';

interface AuthFormProps {
  setIsSignUpFormVisible: (status: boolean) => void;
}

const DATA = [
  {
    component: <LoginForm />,
  },
  {
    component: <SignUp />,
  },
];

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

  return (
    <View style={styles.formContainer}>
      <SwipeButton
        width={300}
        height={50}
        buttonWidth={140}
        buttonHeight={40}
        textLeft={t('signIn')}
        textRight={t('signUp')}
        onEndSwipe={status => {
          setIndex(status);
        }}
        color={colors.white}
        textOnColor={colors.darkBlue}
        textOffColor={colors.darkBlue}
      />
      <FlatList
        data={DATA}
        renderItem={({item}) => item.component}
        horizontal
        scrollEnabled={false}
        ref={ref}
        initialScrollIndex={index}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthForm;
