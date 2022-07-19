import React from 'react';
import players from '../constants/FameDataJSON.json';
import {View, Text, StyleSheet, Image} from 'react-native';
import dayjs from 'dayjs';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import SubmitButton from '../components/SubmitButton';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuStackParams} from '../navigation/MenuNav';
import {useTranslation} from 'react-i18next';

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
        <Text style={styles.title}>{t('HallOfFame')}</Text>
      </View>
      <View style={styles.ranking}>
        <View style={styles.rankignContainer}>
          <View style={styles.place}>
            <Text style={styles.playerName}>{FameDataArray[2].name}</Text>
            <Text style={styles.playerTime}>
              {dayjs(FameDataArray[2].time).format('mm:ss:SSS')}
            </Text>
            <Shadow useArt style={styles.thirdPlaceDropShadow}>
              <View style={styles.thirdPlace}>
                <Text style={styles.position}>3</Text>
              </View>
            </Shadow>
          </View>
          <View style={styles.place}>
            <Text style={styles.playerName}>{FameDataArray[0].name}</Text>
            <Text style={styles.playerTime}>
              {dayjs(FameDataArray[0].time).format('mm:ss:SSS')}
            </Text>
            <Shadow useArt style={styles.firstPlaceDropShadow}>
              <View style={styles.firstPlace}>
                <Text style={styles.position}>1</Text>
              </View>
            </Shadow>
          </View>
          <View style={styles.place}>
            <Text style={styles.playerName}>{FameDataArray[1].name}</Text>
            <Text style={styles.playerTime}>
              {dayjs(FameDataArray[1].time).format('mm:ss:SSS')}
            </Text>
            <Shadow useArt style={styles.secondPlaceDropShadow}>
              <View style={styles.secondPlace}>
                <Text style={styles.position}>2</Text>
              </View>
            </Shadow>
          </View>
        </View>
        <SubmitButton
          buttonText={t('Exit')}
          onPress={() => navigation.navigate('Menu')}
        />
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rankignContainer: {
    flexDirection: 'row',
    flex: 0.6,
  },
  place: {
    alignItems: 'center',
    width: 120,
    padding: 1,
    justifyContent: 'flex-end',
  },
  firstPlace: {
    width: 90,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  firstPlaceDropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 90,
    height: 180,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  secondPlace: {
    width: 90,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  secondPlaceDropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 90,
    height: 140,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  thirdPlace: {
    width: 90,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
  },
  thirdPlaceDropShadow: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    width: 90,
    height: 110,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 2, height: 3},
  },
  playerName: {
    fontFamily: fonts.primaryFont,
    color: colors.white,
    paddingBottom: 5,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    width: 128,
    textAlign: 'center',
  },
  playerTime: {
    fontFamily: fonts.secondaryFont,
    color: colors.white,
    fontSize: 16,
    paddingBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 5,
  },
  position: {
    fontSize: 64,
    fontFamily: fonts.primaryFont,
    color: colors.darkBlue,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 3},
    textShadowRadius: 5,
  },
});

export default Halloffame;
