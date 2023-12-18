import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthState = {
  _id: string;
  avatar: string | null;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

export type AuthStore = {
  auth: AuthState;
  setAuth(value: AuthState | ((prev: AuthState) => Partial<AuthState>)): void;
  resetAuth(): void;
};

export const initialAuth: AuthState = {
  _id: '',
  email: '',
  avatar: null,
  username: '',
  createdAt: '',
  updatedAt: '',
  token: '',
};

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      auth: initialAuth,
      setAuth(value) {
        const prevValue = get().auth;

        if (typeof value === 'function') {
          set({
            auth: {
              ...prevValue,
              ...value(prevValue),
            },
          });

          return;
        }

        set({
          auth: value,
        });
      },
      resetAuth() {
        set({
          auth: initialAuth,
        });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
