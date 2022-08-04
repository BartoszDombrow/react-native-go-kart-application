import React from 'react';
import {FlatList} from 'react-native';
import {ArrayElement} from 'Types';

import racingHistory from '../../constants/RacingHistoryData.json';
import RaceRecord from './RaceRecord';

const RacingHistoryList = () => {
  const renderItem = ({
    item: race,
  }: {
    item: ArrayElement<typeof racingHistory>;
  }) => <RaceRecord raceDate={race.date} trackName={race.trackName} />;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={racingHistory}
      renderItem={renderItem}
      keyExtractor={race => race.date}
    />
  );
};
export default RacingHistoryList;
