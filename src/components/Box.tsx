import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Button} from 'react-native';

export default function Box() {
  const offset = useSharedValue(0);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offset.value * 255)}],
    };
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          {width: 100, height: 50, backgroundColor: 'gray'},
          defaultSpringStyles,
        ]}
      />
      <Animated.View
        style={[
          {width: 100, height: 50, backgroundColor: 'gray'},
          customSpringStyles,
        ]}
      />
      <Button
        onPress={() => {
          offset.value = withSpring(Math.random(), {}, finished => {
            if (finished) {
              console.log('ANIMATION ENDED');
            } else {
              console.log('ANIMATION GOT CANCELLED');
            }
          });
        }}
        title="Move"
      />
    </>
  );
}
