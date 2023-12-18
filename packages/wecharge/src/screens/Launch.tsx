import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import AppLabel from '../components/label/AppLabel';
import useAuthListener from '../hooks/useAuthListener';
import { COLOR_PALETTE } from '../utils/theme';

function Launch() {
  const opacity = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(false);

  const startAnimation = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(0.5),
      useNativeDriver: false,
    }).start(async ({ finished }) => {
      setIsCompleted(finished);
    });
  }, [opacity]);

  useAuthListener(isCompleted);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR_PALETTE.WHITE }}>
      <Animated.View style={{ flex: 1, opacity }}>
        <AppLabel />
      </Animated.View>
    </View>
  );
}

export default Launch;
