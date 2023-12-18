import { useMemo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { CONTAINERS, INPUTS, LABELS } from '../styles';

type Params = {
  disabled?: boolean;
  isValidDate?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  isValid?: boolean;
  isError?: boolean;
};

function useDateTimeStyle({
  containerStyle,
  inputStyle,
  disabled,
  isValidDate,
  placeholder,
  isValid,
  isError,
}: Params) {
  const style = useMemo(() => {
    const inputStyles: StyleProp<ViewStyle>[] = [INPUTS.DATE_TIME];
    const textStyles: StyleProp<TextStyle>[] = [LABELS.DATE_TIME];
    const containerStyles: StyleProp<ViewStyle>[] = [CONTAINERS.DATE_TIME];

    if (disabled) inputStyles.push(INPUTS.DISABLED);
    if (inputStyle) inputStyles.push(inputStyle);
    if (containerStyle) containerStyles.push(containerStyle);
    if (!isValidDate && placeholder) textStyles.push(LABELS.PLACEHOLDER);
    if (isValid) inputStyles.push(INPUTS.VALID);
    if (isError) inputStyles.push(INPUTS.ERROR);

    return { inputStyles, textStyles, containerStyles };
  }, [
    disabled,
    isValidDate,
    placeholder,
    containerStyle,
    inputStyle,
    isValid,
    isError,
  ]);

  return style;
}

export default useDateTimeStyle;
