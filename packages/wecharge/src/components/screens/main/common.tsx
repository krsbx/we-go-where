import React from 'react';
import { Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import { SvgProps } from 'react-native-svg';
import { FONT_SIZE, FONT_SIZE_TYPE } from '../../../constants/fonts';
import { COLOR_PALETTE } from '../../../utils/theme';
import { MasterCard, Visa } from '../../svg';

export function Placeholder() {
  return Array.from({ length: 3 }).map((_, index) => (
    <Text
      style={{
        color: COLOR_PALETTE.NEUTRAL_70,
        fontSize: FONT_SIZE[FONT_SIZE_TYPE.EXTRA_LARGE],
        letterSpacing: scale(2),
        flex: 1,
      }}
      key={index}
    >
      ••••
    </Text>
  ));
}

export function CardIcon({
  cardType,
  ...props
}: Omit<SvgProps, 'children'> & { cardType: string }) {
  switch (cardType) {
    case 'visa':
      return <Visa {...props} />;

    case 'mastercard':
    default:
      return <MasterCard {...props} />;
  }
}
