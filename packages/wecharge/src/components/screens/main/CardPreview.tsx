import { Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { CardState } from '../../../store/state/card';
import { CardIcon, Placeholder } from './common';
import { style } from './style';

function CardPreview({
  lastFour,
  cardHolder,
  expiryDate,
  cardType,
}: CardState) {
  return (
    <View style={[style.cardContainer, extraStyle.cardContainer]}>
      <View style={[style.cardInnerContainer, extraStyle.cardInnerContainer]}>
        <CardIcon cardType={cardType} width={scale(50)} height={scale(30)} />
        <View style={style.cardNumber}>
          <Placeholder />
          <Text style={style.lastFour}>{lastFour}</Text>
        </View>
        <View style={style.cardNumber}>
          <View style={style.cardName}>
            <Text style={style.cardFooterText}>Name on Card</Text>
            <Text style={style.cardFooterBold}>{cardHolder}</Text>
          </View>
          <View style={style.cardExpires}>
            <Text style={style.cardFooterText}>Expires</Text>
            <Text style={style.cardFooterBold}>{expiryDate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const extraStyle = StyleSheet.create({
  cardContainer: {
    padding: scale(10),
    minHeight: scale(150),
  },
  cardInnerContainer: {
    width: '100%',
  },
});

export default CardPreview;
