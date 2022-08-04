import React from 'react';
import players from '../constants/FameDataJSON.json';
import {View, StyleSheet, Image} from 'react-native';
import colors from '../constants/Colors';
import fonts from '../constants/Fonts';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';
import RankingBox from '../components/halloffame/RankingBox';
import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';

function Halloffame() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MenuStackParams>>();

  const compare = (a: any, b: any) => {
    const fameA = a.time;
    const fameB = b.time;

    let comparison = 0;

    if (fameA > fameB) {
      comparison = 1;
    } else if (fameA < fameB) {
      comparison = -1;
    }
    return comparison;
  };

  const myArr = players.player;

  const FameDataArray = myArr.sort(compare);

  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rankingHeader}>
        <View style={styles.imageContainer}>
          <Shadow useArt style={styles.dropShadow}>
            <Shadow inner useArt style={styles.innerShadow}>
              <Image
                source={require('../assets/images/trophy.png')}
                style={styles.image}
              />
            </Shadow>
          </Shadow>
        </View>
        <Typography style={styles.title} variant="smallTitle">
          {t('hallOfFame')}
        </Typography>
      </View>
      <View style={styles.rankignContainer}>
        <View style={styles.rankings}>
          <RankingBox
            height={110}
            playerPosition="3"
            playerName={FameDataArray[2].name}
            playerTime={FameDataArray[2].time}
          />
          <RankingBox
            height={180}
            playerPosition="1"
            playerName={FameDataArray[0].name}
            playerTime={FameDataArray[0].time}
          />
          <RankingBox
            height={140}
            playerPosition="2"
            playerName={FameDataArray[1].name}
            playerTime={FameDataArray[1].time}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          buttonText={t('exit')}
          onPress={() => {
            navigation.navigate('Menu');
          }}
          buttonVariant="bigButton"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  rankingHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  imageContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 150,
    height: 150,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  innerShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.35,
    shadowColor: '#000000',
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 150,
    height: 150,
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.primaryFont,
    paddingTop: 24,
    fontSize: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 5,
  },
  rankignContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    flex: 1,
  },
  rankings: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 32,
  },
  button: {
    width: 300,
    height: 80,
  },
});

export default Halloffame;
