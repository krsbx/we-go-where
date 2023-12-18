import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE, FONT_SIZE_TYPE } from '../../../constants/fonts';
import { CardState } from '../../../store/state/card';
import { COLOR_PALETTE } from '../../../utils/theme';
import { MasterCard, Visa } from '../../svg';

function Placeholder() {
  return Array.from({ length: 3 }).map((_, index) => (
    <Text style={style.placeholder} key={index}>
      ••••
    </Text>
  ));
}

function UserCard({ cardType, lastFour, cardHolder, expiryDate }: CardState) {
  const CardIcon = useMemo(() => {
    switch (cardType) {
      case 'visa':
        return Visa;

      case 'mastercard':
      default:
        return MasterCard;
    }
  }, [cardType]);

  return (
    <View style={style.cardContainer}>
      <View style={style.cardInnerContainer}>
        <CardIcon width={scale(50)} height={scale(30)} />
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

const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLOR_PALETTE.WHITE,
    borderRadius: scale(10),
    padding: scale(FONT_SIZE[FONT_SIZE_TYPE.EXTRA_LARGE]),
    elevation: 20,
    shadowColor: COLOR_PALETTE.NEUTRAL_70,
  },
  cardInnerContainer: {
    flex: 1,
    height: '100%',
    minHeight: scale(110),
    rowGap: scale(15),
    width: '98%',
  },
  cardNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    color: COLOR_PALETTE.NEUTRAL_70,
    fontSize: FONT_SIZE[FONT_SIZE_TYPE.EXTRA_LARGE],
    letterSpacing: scale(2),
    flex: 1,
  },
  get lastFour() {
    return {
      ...this.placeholder,
      fontSize: FONT_SIZE[FONT_SIZE_TYPE.SMALL],
      fontWeight: 'bold',
    } satisfies TextStyle;
  },
  cardName: {
    rowGap: scale(5),
    flex: 3,
  },
  get cardExpires() {
    return {
      ...this.cardName,
      flex: 1,
    } satisfies TextStyle;
  },
  cardFooterText: {
    color: COLOR_PALETTE.NEUTRAL_60,
    fontSize: FONT_SIZE[FONT_SIZE_TYPE.EXTRA_SMALL],
  },
  cardFooterBold: {
    color: COLOR_PALETTE.NEUTRAL_90,
    fontSize: FONT_SIZE[FONT_SIZE_TYPE.SMALL],
    fontWeight: 'bold',
  },
});

export default UserCard;
