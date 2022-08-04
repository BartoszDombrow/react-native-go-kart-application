import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import colors from '../../constants/Colors';
import Typography from '../../typography/Typography';

interface StatisticsBoxProp {
  icon: JSX.Element;
  description: string;
  statisticsValue: string;
}

const StatisticsBox: React.FC<StatisticsBoxProp> = ({
  icon,
  description,
  statisticsValue,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.statisticsBox}>
      <View style={styles.statisticsTile}>
        <>
          {icon}
          <Typography variant="spanBold">{t(description)}</Typography>
        </>
      </View>
      <Typography variant="span" style={styles.textStyle}>
        {statisticsValue}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticsBox: {
    flex: 0.5,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statisticsTile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    paddingTop: 8,
    color: colors.white,
    fontSize: 20,
  },
});

export default StatisticsBox;
