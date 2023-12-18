import { StackActions, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import {
  LAUNCHER_STACK,
  LauncherStackScreenNavigation,
} from '../constants/screens/launcher';
import useAuthStore from '../store/state/auth';

function useAuthListener(isCallable: boolean) {
  const auth = useAuthStore((state) => state.auth);
  const navigation =
    useNavigation<LauncherStackScreenNavigation<typeof LAUNCHER_STACK.AUTH>>();

  const navigateToLogin = useCallback(() => {
    navigation.dispatch(StackActions.replace(LAUNCHER_STACK.AUTH));
  }, [navigation]);

  const navigateToMain = useCallback(() => {
    navigation.dispatch(StackActions.replace(LAUNCHER_STACK.MAIN));
  }, [navigation]);

  useEffect(() => {
    if (!isCallable) return;

    if (!auth._id) {
      navigateToLogin();
      return;
    }

    navigateToMain();
  }, [auth._id, isCallable, navigateToLogin, navigateToMain]);
}

export default useAuthListener;
