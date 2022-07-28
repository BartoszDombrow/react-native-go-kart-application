import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';

import LoginForm from './LoginForm';
import SignUp from './SignUpForm';
import colors from '../../constants/Colors';

import {useTranslation} from 'react-i18next';
import SwipeButton from '../SwipeButton';

const DATA = [
  {
    component: <LoginForm />,
  },
  {
    component: <SignUp />,
  },
];

const AuthForm = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const {t} = useTranslation();

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);

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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  switchContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    marginTop: 30,
    borderRadius: 25,
    backgroundColor: colors.darkBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.55,
    shadowColor: '#000000',
    shadowRadius: 5,
  },
  switchBox: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    color: colors.white,
  },
  selectedSwitch: {
    color: colors.darkBlue,
  },
  fadingContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width * 0.4,
    height: 40,
    top: 5,
    left: 5,
    borderRadius: 25,
    backgroundColor: colors.white,
    elevation: 25,
  },
  pickedForm: {
    width: Dimensions.get('window').width * 0.4,
    height: 40,
    borderRadius: 25,
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 4},
  },
});

export default AuthForm;
