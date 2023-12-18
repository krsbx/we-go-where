import { StackScreenProps } from '@react-navigation/stack';

export const MAIN_STACK = {
  CARDS: 'main-stack.cards',
  ADD_CARD: 'main-stack.add-card',
} as const;

export type MainStackParam = {
  [MAIN_STACK.CARDS]: undefined;
  [MAIN_STACK.ADD_CARD]: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParam> =
  StackScreenProps<MainStackParam, T>;

export type MainStackScreenNavigation<T extends keyof MainStackParam> =
  MainStackScreenProps<T>['navigation'];
