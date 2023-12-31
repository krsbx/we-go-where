import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { CardState } from '../../../store/state/card';
import { MasterCard, Visa } from '../../svg';
import { Placeholder } from './common';
import { style } from './style';

type Props = CardState & {
  onPress?: () => void;
};

function UserCard({
  cardType,
  lastFour,
  cardHolder,
  expiryDate,
  onPress,
}: Props) {
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
    <TouchableOpacity style={style.cardContainer} onPress={onPress}>
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
    </TouchableOpacity>
  );
}

export default UserCard;
