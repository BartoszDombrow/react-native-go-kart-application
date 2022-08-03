import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

import colors from '../../constants/Colors';
import Typography from '../../typography/Typography';

interface StatisticsBoxProp {
  iconName: 'trophy' | 'race' | 'distance' | 'time';
  description: string;
  statisticsValue: string;
}

const StatisticsBox: React.FC<StatisticsBoxProp> = ({
  iconName,
  description,
  statisticsValue,
}) => {
  const {t} = useTranslation();

  // No idea how to do it better :(
  const icons = [
    {
      name: 'trophy',
      icon: <Ionicons name="trophy-outline" size={32} color={colors.white} />,
    },
    {
      name: 'race',
      icon: (
        <FontAwesome5 name="flag-checkered" size={32} color={colors.white} />
      ),
    },
    {
      name: 'distance',
      icon: (
        <MaterialCommunityIcons
          name="steering"
          size={32}
          color={colors.white}
        />
      ),
    },
    {
      name: 'time',
      icon: (
        <Ionicons name="hourglass-outline" size={32} color={colors.white} />
      ),
    },
  ];

  return (
    <View style={styles.statisticsBox}>
      <View style={styles.statisticsTile}>
        {icons.find(icon => icon.name === iconName)?.icon}
        <Typography variant="spanBold">{t(description)}</Typography>
      </View>
      <Typography variant="basicTextBold" style={{color: colors.white}}>
        {statisticsValue}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsBox: {},
  statisticsTile: {},
});

export default StatisticsBox;
