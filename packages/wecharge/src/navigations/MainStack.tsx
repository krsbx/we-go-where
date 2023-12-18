import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { MAIN_STACK, MainStackParam } from '../constants/screens/main';
import { AddCard, Cards } from '../screens/main';
import { COLOR_PALETTE } from '../utils/theme';

const Stack = createStackNavigator<MainStackParam>();

function MainStack() {
  return (
    <React.Fragment>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.WHITE}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName={MAIN_STACK.CARDS}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={MAIN_STACK.CARDS} component={Cards} />
        <Stack.Screen name={MAIN_STACK.ADD_CARD} component={AddCard} />
      </Stack.Navigator>
    </React.Fragment>
  );
}

export default MainStack;
