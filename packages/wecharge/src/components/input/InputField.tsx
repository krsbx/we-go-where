import { Input, InputProps } from '@rneui/themed';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import MaskInput, { Mask } from 'react-native-mask-input';
import { scale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { FONT_SIZE } from '../../constants/fonts';
import { CONTAINERS, ERRORS, INPUTS } from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';
import RequiredLabel from '../label/RequiredLabel';

/**
 * @example InputField with Mask
 * ```tsx
 *
 * return (
 *    <InputField
 *      onChangeText={(masked, unmasked, obfuscated) => setValue(obfuscated)}
 *      mask={Masks.ZIP_CODE}
 *      value={value}
 *    />
 * );
 * ```
 */
const InputField = React.forwardRef<TextInput, Props>(
  ({ isRequired, onChangeText, isValid, isError = false, ...props }, ref) => {
    const isPassword = useMemo(() => {
      return props.isPassword || props.secureTextEntry;
    }, [props.isPassword, props.secureTextEntry]);
    const [isSecureVisible, setIsSecureVisible] = useState(
      props.isPassword || props.secureTextEntry
    );

    const label = useMemo(() => {
      if (!props.label) return;

      return (
        <RequiredLabel
          style={props.labelStyle}
          children={props.label}
          isRequired={isRequired}
        />
      );
    }, [props.label, props.labelStyle, isRequired]);

    const inputStyle = useMemo(() => {
      const styles: StyleProp<TextStyle>[] = [INPUTS.INPUT];

      if (isError) styles.push(INPUTS.ERROR);
      if (isValid) styles.push(INPUTS.VALID);
      if (isPassword || props.rightIcon) styles.push(INPUTS.RIGHT_ICON);
      if (props.leftIcon) styles.push(INPUTS.LEFT_ICON);
      if (props.inputStyle) styles.push(props.inputStyle);

      return styles;
    }, [
      isValid,
      isError,
      isPassword,
      props.rightIcon,
      props.leftIcon,
      props.inputStyle,
    ]);

    const rightIconContainerStyle = useMemo(() => {
      const styles: StyleProp<TextStyle>[] = [CONTAINERS.RIGHT_ICON_ICON];

      if (isError) styles.push(INPUTS.ERROR);
      if (isValid) styles.push(INPUTS.VALID);
      if (props.disabled) styles.push(CONTAINERS.RIGHT_ICON_DISABLED);
      if (props.rightIconContainerStyle)
        styles.push(props.rightIconContainerStyle);

      return styles;
    }, [isValid, isError, props.disabled, props.rightIconContainerStyle]);

    const leftIconContainerStyle = useMemo(() => {
      const styles: StyleProp<TextStyle>[] = [CONTAINERS.LEFT_ICON_ICON];

      if (isError) styles.push(INPUTS.ERROR);
      if (isValid) styles.push(INPUTS.VALID);
      if (props.disabled) styles.push(CONTAINERS.LEFT_ICON_DISABLED);
      if (props.leftIconContainerStyle)
        styles.push(props.leftIconContainerStyle);

      return styles;
    }, [isValid, isError, props.disabled, props.leftIconContainerStyle]);

    const errorStyle = useMemo(() => {
      const styles: StyleProp<TextStyle>[] = [ERRORS.ERROR];

      if (props.errorStyle) styles.push(props.errorStyle);

      return styles;
    }, [props.errorStyle]);

    const inputContainerStyle = useMemo(() => {
      const styles: StyleProp<ViewStyle>[] = [
        {
          borderBottomWidth: 0,
          marginBottom: scale(5),
        },
      ];

      if (props.inputContainerStyle) styles.push(props.inputContainerStyle);

      return styles;
    }, [props.inputContainerStyle]);

    const onEyePress = useCallback(
      () => setIsSecureVisible((curr) => !curr),
      [setIsSecureVisible]
    );

    const rightIcon = useMemo(() => {
      if (!isPassword) return;

      return (
        <View style={CONTAINERS.RIGHT_ICON}>
          <Entypo
            name={isSecureVisible ? 'eye' : 'eye-with-line'}
            size={scale(FONT_SIZE.EXTRA_SMALL)}
            onPress={onEyePress}
          />
        </View>
      );
    }, [isPassword, isSecureVisible, onEyePress]);

    return (
      <Input
        disabledInputStyle={INPUTS.DISABLED}
        placeholderTextColor={COLOR_PALETTE.PLACEHOLDER}
        numberOfLines={1}
        renderErrorMessage={isError}
        rightIcon={rightIcon}
        {...props}
        {...(props.mask ? { InputComponent: MaskInput } : {})}
        inputContainerStyle={inputContainerStyle}
        errorStyle={errorStyle}
        inputStyle={inputStyle}
        leftIconContainerStyle={leftIconContainerStyle}
        rightIconContainerStyle={rightIconContainerStyle}
        errorMessage={isError ? props.errorMessage : undefined}
        // [masked, unmasked, obfuscated]: string[]
        onChangeText={(...args) => onChangeText?.(...args)}
        secureTextEntry={isSecureVisible}
        label={label}
        ref={ref as never}
      />
    );
  }
);

type Props = Omit<InputProps, 'onChangeText'> & {
  isRequired?: boolean;
  isValid?: boolean;
  isError?: boolean;
  isPassword?: boolean;
  mask?: Mask;
  onChangeText?: (...args: string[]) => void;
};

export default InputField;
