import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { CONTAINERS } from '../../styles';

type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element;
};

function LeftRightIconWrapper({
  leftIcon,
  leftIconContainerStyle,
  rightIcon,
  rightIconContainerStyle,
  children,
}: Props) {
  return (
    <React.Fragment>
      {leftIcon && (
        <View style={[CONTAINERS.ICON, leftIconContainerStyle]}>
          {leftIcon}
        </View>
      )}
      {children}
      {rightIcon && (
        <View style={[CONTAINERS.ICON, rightIconContainerStyle]}>
          {rightIcon}
        </View>
      )}
    </React.Fragment>
  );
}

export default LeftRightIconWrapper;
