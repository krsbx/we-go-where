import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { scale } from 'react-native-size-matters';

function useAuthFormAnimation(isAutomated: boolean) {
  const flex = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const style = useMemo(() => {
    const style = {
      flex: flex,
      opacity: opacity,
      rowGap: scale(10),
    };

    return style;
  }, [flex, opacity]);

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(flex, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: false,
          easing: Easing.elastic(1.5),
        }),
      ]),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          delay: 750,
          duration: 750,
          useNativeDriver: false,
          easing: Easing.bounce,
        }),
      ]),
    ]).start();
  }, [flex, opacity]);

  const resetAnimation = useCallback(() => {
    flex.setValue(0);
    opacity.setValue(0);
  }, [flex, opacity]);

  useEffect(() => {
    if (!isAutomated) return;

    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutomated]);

  return {
    animation: {
      start: startAnimation,
      reset: resetAnimation,
    },
    style,
  };
}

export default useAuthFormAnimation;
