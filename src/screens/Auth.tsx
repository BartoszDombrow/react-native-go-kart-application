import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Auth = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoWrapper}>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/car.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.logoWrapperText}>
          <Text style={styles.logoHeader}>Track</Text>
          <Text style={styles.logoText}>Masters</Text>
        </View>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#577399',
    height: '100%',
    paddingTop: 20,
  },
  logoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoWrapperText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeader: {
    fontSize: 36,
    fontFamily: 'Roboto',
    color: '#F7F7FF',
  },
  logoText: {
    fontSize: 36,
    color: '#F7F7FF',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
    height: 175,
    backgroundColor: '#BDD5EA',
    borderRadius: 30,
  },
  image: {
    width: 120,
    height: 120,
    transform: [{rotate: '-45deg'}],
  },
});
