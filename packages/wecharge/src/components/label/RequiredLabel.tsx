import { Text, TextProps } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { LABELS } from '../../styles';
import { flattenStyle } from '../../styles/factory';

type Props = TextProps & {
  isRequired?: boolean;
  requiredStyle?: StyleProp<TextStyle>;
};

const RequiredLabel = ({
  isRequired,
  style,
  requiredStyle,
  ...props
}: Props) => {
  const textStyle = useMemo(() => {
    const textStyles: StyleProp<TextStyle>[] = [LABELS.REQUIRED_LABEL];

    if (style) textStyles.push(style);

    return textStyles;
  }, [style]);

  const starStyle = useMemo(() => {
    const requiredStyles: StyleProp<TextStyle>[] = [LABELS.REQUIRED_STAR];

    if (requiredStyle) requiredStyles.push(requiredStyle);

    return requiredStyles;
  }, [requiredStyle]);

  return (
    <View style={inlineStyle}>
      <Text {...props} style={textStyle} />
      {isRequired && <Text style={starStyle}>*</Text>}
    </View>
  );
};

const inlineStyle = flattenStyle({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginBottom: scale(5),
  columnGap: scale(2),
});

export default RequiredLabel;
