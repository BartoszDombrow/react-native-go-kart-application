import dayjs from 'dayjs';
import React from 'react';
import {Dimensions, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/Colors';
import Typography from '../../typography/Typography';

interface RaceRecordProp {
  raceDate: string;
  trackName: string;
}

const RaceRecord: React.FC<RaceRecordProp> = ({raceDate, trackName}) => {
  return (
    <TouchableOpacity>
      <Shadow useArt style={styles.raceRecord}>
        <View>
          <MaterialIcons name="touch-app" color={colors.white} size={32} />
        </View>
        <View>
          <Typography variant="span" style={styles.raceText}>
            {dayjs(raceDate).format('DD.MM.YYYY HH:mm')}
          </Typography>
          <Typography variant="span" style={styles.raceText}>
            {trackName}
          </Typography>
        </View>
      </Shadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  raceRecord: {
    width: Dimensions.get('screen').width * 0.75,
    height: 50,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 3},
    flexDirection: 'row',
    margin: 16,
  },
  raceText: {
    fontSize: 12,
  },
});

export default RaceRecord;