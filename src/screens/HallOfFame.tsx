import React from 'react';
import players from '../constants/FameDataJSON.json';
import {View, StyleSheet, Image} from 'react-native';
import dayjs from 'dayjs';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';
import RankingBox from '../components/halloffame/RankingBox';
import Typography from '../typography/Typography';
import CustomButton from '../components/button/CustomButton';

const colors = new Colors();
const fonts = new Fonts();

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
    <View style={styles.container}>
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
      <View style={styles.ranking}>
        <View style={styles.rankignContainer}>
          <RankingBox
            height={110}
            text="3"
            playerName="PlayerX"
            playerTime={dayjs(FameDataArray[2].time).format('mm:ss:SSS')}
          />
          <RankingBox
            height={180}
            text="1"
            playerName="PlayerY"
            playerTime={dayjs(FameDataArray[0].time).format('mm:ss:SSS')}
          />
          <RankingBox
            height={140}
            text="2"
            playerName="PlayerZ"
            playerTime={dayjs(FameDataArray[1].time).format('mm:ss:SSS')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <CustomButton
              buttonText={t('exit').toUpperCase()}
              onPress={() => {
                navigation.navigate('Menu');
              }}
              buttonVariant="bigButton"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumBlue,
  },
  rankingHeader: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingTop: 40,
    fontSize: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 4},
    textShadowRadius: 5,
  },
  ranking: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankignContainer: {
    flexDirection: 'row',
    flex: 0.6,
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 80,
  },
});

export default Halloffame;
