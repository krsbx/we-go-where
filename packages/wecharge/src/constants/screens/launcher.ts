import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParam } from './auth';
import { MainStackParam } from './main';

export const LAUNCHER_STACK = {
  LAUNCH: 'launch.screen',
  AUTH: 'auth-stack',
  MAIN: 'main-stack',
} as const;

export type LauncherStackParam = {
  [LAUNCHER_STACK.LAUNCH]: undefined;
  [LAUNCHER_STACK.AUTH]: NavigatorScreenParams<AuthStackParam>;
  [LAUNCHER_STACK.MAIN]: NavigatorScreenParams<MainStackParam>;
};

export type LauncherStackScreenProps<T extends keyof LauncherStackParam> =
  StackScreenProps<LauncherStackParam, T>;

export type LauncherStackScreenNavigation<T extends keyof LauncherStackParam> =
  LauncherStackScreenProps<T>['navigation'];
