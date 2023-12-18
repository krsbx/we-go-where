import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AUTH_STACK, AuthStackParam } from '../constants/screens/auth';
import { SignIn, SignUp } from '../screens/auth';

const Stack = createStackNavigator<AuthStackParam>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_STACK.SIGN_IN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AUTH_STACK.SIGN_IN} component={SignIn} />
      <Stack.Screen name={AUTH_STACK.SIGN_UP} component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
