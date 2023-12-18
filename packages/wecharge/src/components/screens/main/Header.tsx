import { Text } from '@rneui/base';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { FONT_SIZE, FONT_SIZE_TYPE } from '../../../constants/fonts';
import { COLOR_PALETTE } from '../../../utils/theme';

type HeaderProps = {
  title?: string;
  rightIcon?: React.ReactNode;
} & (
  | {
      withBack: true;
      onBack(): void;
    }
  | {
      withBack?: false;
    }
);

function Header(props: HeaderProps) {
  return (
    <View style={style.headerContainer}>
      {props.withBack && (
        <TouchableOpacity onPress={props.onBack}>
          <EntypoIcon
            name="chevron-left"
            size={scale(20)}
            color={COLOR_PALETTE.NEUTRAL_90}
          />
        </TouchableOpacity>
      )}
      {props.title && <Text style={style.headerTitle}>{props.title}</Text>}
      {props.rightIcon}
    </View>
  );
}

const style = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLOR_PALETTE.WHITE,
    height: scale(40),
  },
  headerTitle: {
    fontSize: scale(FONT_SIZE[FONT_SIZE_TYPE.SMALL]),
    color: COLOR_PALETTE.NEUTRAL_90,
    fontWeight: 'bold',
  },
});

export default Header;
