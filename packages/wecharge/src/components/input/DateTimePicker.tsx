import { Text } from '@rneui/base';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import useDateTimeStyle from '../../hooks/useDateTimeStyle';
import { ERRORS } from '../../styles';
import RequiredLabel from '../label/RequiredLabel';
import LeftRightIconWrapper from '../wrapper/LeftRightIconWrapper';

function DateTimePicker({
  value,
  placeholder,
  label,
  isRequired,
  leftIcon,
  leftIconContainerStyle,
  rightIcon,
  rightIconContainerStyle,
  containerStyle,
  inputStyle,
  onConfirm: onConfirmProps,
  onDateChange: onDateChangeProps,
  disabled,
  onBlur,
  isValid,
  isError,
  errorMessage,
  errorStyle: errorStyleProps,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const date = useMemo(() => {
    if (typeof value === 'string' && !_.isEmpty(value)) return new Date(value);

    return null;
  }, [value]);
  const isValidDate = useMemo(() => dayjs(date).isValid(), [date]);

  const format = useMemo(() => {
    switch (props.mode) {
      case 'date':
        return 'DD/MM/YYYY';
      case 'time':
        return 'hh:mm A';
      default:
        return 'DD/MM/YYYY hh:mm A';
    }
  }, [props.mode]);

  const style = useDateTimeStyle({
    containerStyle,
    disabled,
    inputStyle,
    isValidDate,
    placeholder,
    isValid,
    isError,
  });

  const errorStyle = useMemo(() => {
    const styles: StyleProp<TextStyle>[] = [ERRORS.ERROR_DATE];

    if (errorStyleProps) styles.push(errorStyleProps);

    return styles;
  }, [errorStyleProps]);

  const onPress = useCallback(() => {
    if (disabled) return;

    setIsOpen(true);
  }, [disabled, setIsOpen]);

  const onCancel = useCallback(() => {
    if (disabled) return;

    setIsOpen(false);
    onBlur?.();
  }, [disabled, setIsOpen, onBlur]);

  const onConfirm = useCallback(
    (date: Date) => {
      onConfirmProps?.(date);
      setIsOpen(false);
      onBlur?.();
    },
    [onConfirmProps, setIsOpen, onBlur]
  );

  const onDateChange = useCallback(
    (date: Date) => {
      onDateChangeProps?.(date);
      onBlur?.();
    },
    [onDateChangeProps, onBlur]
  );

  return (
    <React.Fragment>
      <View style={style.containerStyles}>
        {label && (
          <RequiredLabel isRequired={isRequired}>{label}</RequiredLabel>
        )}
        <TouchableOpacity
          style={style.inputStyles}
          activeOpacity={1}
          onPress={onPress}
        >
          <LeftRightIconWrapper
            leftIcon={leftIcon}
            leftIconContainerStyle={leftIconContainerStyle}
            rightIcon={rightIcon}
            rightIconContainerStyle={rightIconContainerStyle}
          >
            <Text style={style.textStyles}>
              {isValidDate ? dayjs(date).format(format) : placeholder ?? ''}
            </Text>
          </LeftRightIconWrapper>
        </TouchableOpacity>
        {isError && !!errorMessage && (
          <Text style={errorStyle}>{errorMessage}</Text>
        )}
      </View>
      <DatePicker
        open={isOpen}
        date={date ?? new Date()}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onDateChange={onDateChange}
        modal
        {...props}
      />
    </React.Fragment>
  );
}

type Props = Omit<DatePickerProps, 'open' | 'onCancel' | 'date'> & {
  value?: Date | string | null;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  errorStyle?: StyleProp<TextStyle>;
  isValid?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export default DateTimePicker;
