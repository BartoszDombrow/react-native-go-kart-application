import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import Typography from './Typography';
import colors from '../../constants/Colors';

interface TimerProps {
  isRunning: boolean;
  startLapTime: number;
}

const Timer: React.FC<TimerProps> = ({startLapTime, isRunning}) => {
  const [lapTime, setLapTime] = useState(0);

  useEffect(() => {
    if (isRunning) {
      let interval = setInterval(() => {
        setLapTime(Date.now() - startLapTime);
      }, 111);
      return () => clearInterval(interval);
    } else {
      setLapTime(0);
    }
  }, [startLapTime, isRunning]);

  return (
    <Typography variant="basicText" style={{color: colors.darkBlue}}>
      {dayjs().startOf('day').millisecond(lapTime).format('mm:ss:SSS')}
    </Typography>
  );
};

export default Timer;
