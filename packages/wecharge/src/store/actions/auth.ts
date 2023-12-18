import { decode } from 'base-64';
import { jwtDecode } from 'jwt-decode';
import { SignInSchema, SignUpSchema, signInSchema } from '../../schemas/auth';
import axios from '../axios';
import useAuthStore, { AuthState } from '../state/auth';

global.atob = decode;

export async function signIn(payload: SignInSchema) {
  const { setAuth } = useAuthStore.getState();

  const body = signInSchema.parse(payload);

  const { data } = await axios.post<{ token: string }>('/auth/signin', body);

  const decoded = jwtDecode<AuthState>(data.token);

  const result = {
    ...decoded,
    token: data.token,
  };

  setAuth(result);
}

export async function signUp(payload: SignUpSchema) {
  await axios.post('/auth/signup', payload);
}
