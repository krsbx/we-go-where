import { StackScreenProps } from '@react-navigation/stack';

export const AUTH_STACK = {
  SIGN_IN: 'auth.sign-in.screen',
  SIGN_UP: 'auth.sign-up.screen',
} as const;

export type AuthStackParam = {
  [AUTH_STACK.SIGN_IN]: undefined;
  [AUTH_STACK.SIGN_UP]: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParam> =
  StackScreenProps<AuthStackParam, T>;

export type AuthStackScreenNavigation<T extends keyof AuthStackParam> =
  AuthStackScreenProps<T>['navigation'];
