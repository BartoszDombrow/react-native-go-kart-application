import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../constants/Colors';
import {Shadow} from 'react-native-neomorph-shadows-fixes';
import Typography from '../typography/Typography';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

interface Props {
  width: number;
  height: number;
  buttonWidth: number;
  buttonHeight: number;
  onEndSwipe: (status: number) => void;
  textLeft: string;
  textRight: string;
  textOnColor: string;
  textOffColor: string;
  color: string;
}

const SwipeButton: React.FC<Props> = ({
  width,
  height,
  buttonWidth,
  buttonHeight,
  onEndSwipe,
  textLeft,
  textRight,
  textOnColor,
  textOffColor,
  color,
}) => {
  const [status, setStatus] = useState(false);
  const [touchSwiper, setTouchSwiper] = useState(false);

  const translateX = useSharedValue(0);
  const endPoint = width - buttonWidth - 10;

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (!status) {
        if (event.translationX > 0) {
          if (translateX.value < endPoint) {
            translateX.value = event.translationX;
          } else {
            translateX.value = endPoint;
          }
        }
      } else {
        if (event.translationX < 0) {
          if (translateX.value > 0) {
            translateX.value = endPoint + event.translationX;
          } else {
            translateX.value = 0;
          }
        }
      }
    },
    onEnd: () => {
      if (translateX.value > 0.25 * width) {
        translateX.value = withTiming(endPoint);
        runOnJS(setStatus)(true);
        runOnJS(onEndSwipe)(1);
      } else {
        translateX.value = withTiming(0);
        runOnJS(setStatus)(false);
        runOnJS(onEndSwipe)(0);
      }
      if (touchSwiper) {
        runOnJS(setTouchSwiper)(false);
      } else {
        runOnJS(setTouchSwiper)(true);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView>
      <Shadow
        inner
        useArt
        style={{width, height, ...styles.swipeContainer}}
        onTouchEnd={event => {
          if (!touchSwiper) {
            if (status && event.nativeEvent.locationX < width / 2) {
              translateX.value = withTiming(0);
              setStatus(false);
              onEndSwipe(0);
            } else if (!status && event.nativeEvent.locationX > width / 2) {
              translateX.value = withTiming(endPoint);
              setStatus(true);
              onEndSwipe(1);
            }
          }
        }}>
        <View style={styles.swipeBox} pointerEvents={'none'}>
          <Typography
            variant="basicTextBold"
            style={{color: status ? textOffColor : textOnColor}}>
            {textLeft}
          </Typography>
        </View>
        <View style={styles.swipeBox} pointerEvents={'none'}>
          <Typography
            variant="basicTextBold"
            style={{color: status ? textOnColor : textOffColor}}>
            {textRight}
          </Typography>
        </View>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View
            style={[
              {
                height: buttonHeight,
                width: buttonWidth,
                backgroundColor: color,
                ...styles.swipeButton,
              },
              rStyle,
            ]}
            onTouchStart={() => setTouchSwiper(true)}
            onTouchEnd={() => setTouchSwiper(false)}
          />
        </PanGestureHandler>
      </Shadow>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.55,
    shadowColor: '#000000',
    shadowRadius: 5,
  },
  swipeButton: {
    borderRadius: 25,
    elevation: 25,
    position: 'absolute',
    left: 5,
  },
  swipeBox: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    zIndex: 1,
  },
});

export default SwipeButton;
