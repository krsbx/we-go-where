import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import {
  LAUNCHER_STACK,
  LauncherStackParam,
} from '../constants/screens/launcher';
import Launch from '../screens/Launch';
import { COLOR_PALETTE } from '../utils/theme';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createStackNavigator<LauncherStackParam>();

function LauncherStack() {
  return (
    <React.Fragment>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.WHITE}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName={LAUNCHER_STACK.LAUNCH}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={LAUNCHER_STACK.LAUNCH} component={Launch} />
        <Stack.Screen name={LAUNCHER_STACK.AUTH} component={AuthStack} />
        <Stack.Screen name={LAUNCHER_STACK.MAIN} component={MainStack} />
      </Stack.Navigator>
    </React.Fragment>
  );
}

export default LauncherStack;
