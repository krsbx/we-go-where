import { StyleSheet } from 'react-native';
import { TextStyle, scale } from 'react-native-size-matters';
import { FONT_SIZE, FONT_SIZE_TYPE } from '../../../constants/fonts';
import { COLOR_PALETTE } from '../../../utils/theme';

export const style = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLOR_PALETTE.WHITE,
    borderRadius: scale(10),
    padding: scale(FONT_SIZE[FONT_SIZE_TYPE.EXTRA_LARGE]),
    elevation: 20,
    shadowColor: COLOR_PALETTE.NEUTRAL_70,
    minHeight: scale(130),
  },
  cardInnerContainer: {
    flex: 1,
    height: '100%',
    rowGap: scale(15),
    width: '98%',
  },
  cardNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  get lastFour() {
    return {
      color: COLOR_PALETTE.NEUTRAL_70,
      letterSpacing: scale(2),
      flex: 1,
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
