import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/src/components/Dropdown/model';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../../constants/fonts';
import { ERRORS, INPUTS, LABELS } from '../../styles';
import { COLOR_PALETTE, opacityColor } from '../../utils/theme';
import RequiredLabel from '../label/RequiredLabel';

function Dropdown<T>({
  label,
  isRequired,
  isError,
  isValid,
  errorMessage,
  ...props
}: Props<T>) {
  const styles = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [style.style];

    if (isValid) styles.push(INPUTS.VALID);
    if (isError) styles.push(INPUTS.ERROR);

    return styles;
  }, [isValid, isError]);

  return (
    <View style={[INPUTS.DEFAULT_PADDING, style.container]}>
      {label && <RequiredLabel isRequired={isRequired}>{label}</RequiredLabel>}
      <RNDropdown<T>
        style={styles}
        placeholderStyle={LABELS.PLACEHOLDER}
        activeColor={opacityColor(COLOR_PALETTE.NEUTRAL_20, 0.7)}
        itemContainerStyle={style.itemContainer}
        selectedTextStyle={style.itemText}
        itemTextStyle={style.itemText}
        {...props}
      />
      {isError && !!errorMessage && (
        <Text style={ERRORS.ERROR_DATE}>{errorMessage}</Text>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom: scale(5),
  },
  style: {
    ...INPUTS.INPUT,
    height: scale(40),
  },
  itemContainer: {
    height: scale(48),
  },
  itemText: {
    color: COLOR_PALETTE.NEUTRAL_90,
    fontSize: scale(FONT_SIZE.EXTRA_SMALL),
  },
});

type Props<T> = DropdownProps<T> & {
  label?: string;
  isRequired?: boolean;
  isValid?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export default Dropdown;
