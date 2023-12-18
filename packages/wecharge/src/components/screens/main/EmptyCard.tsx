import { Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE, FONT_SIZE_TYPE } from '../../../constants/fonts';
import { COLOR_PALETTE } from '../../../utils/theme';

function EmptyCard() {
  return (
    <View style={style.mainContainer}>
      <View style={style.emptyCardContainer}>
        <Text style={style.ccIcon}>💳</Text>
        <Text style={style.noCardText}>No Cards Found</Text>
        <Text style={style.noCardText}>
          We recommend adding a card for easy payment
        </Text>
        <TouchableOpacity style={style.addCardContainer}>
          <Text style={style.addCardText}>Add New Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyCardContainer: {
    backgroundColor: COLOR_PALETTE.WHITE,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    rowGap: scale(5),
    paddingBottom: scale(15),
    flex: 1,
  },
  ccIcon: {
    fontSize: scale(35),
  },
  noCardText: {
    fontSize: scale(FONT_SIZE[FONT_SIZE_TYPE.EXTRA_SMALL]),
    textAlign: 'center',
  },
  addCardContainer: {
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(15),
  },
  addCardText: {
    fontSize: scale(FONT_SIZE[FONT_SIZE_TYPE.EXTRA_SMALL]),
    color: '#4AD8DA',
  },
});

export default EmptyCard;
