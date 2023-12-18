import { Text } from '@rneui/base';
import React from 'react';
import { Animated } from 'react-native';
import { LABELS } from '../../styles';

const AppLabel = () => (
  <Animated.View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text style={LABELS.DEFAULT_LARGE}>WeCharge</Text>
    <Text style={LABELS.DEFAULT_TEXT}>
      Easily manage your credit cards, transactions, and more
    </Text>
  </Animated.View>
);

export default AppLabel;
