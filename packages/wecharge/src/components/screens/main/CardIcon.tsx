import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { JCB, MasterCard, Visa } from '../../svg';

function CardIcon() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Visa width={scale(20)} height={scale(20)} />
      <MasterCard width={scale(20)} height={scale(20)} />
      <JCB width={scale(20)} height={scale(20)} />
    </View>
  );
}

export default CardIcon;
