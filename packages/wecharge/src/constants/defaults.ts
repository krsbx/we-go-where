import { SignInPayload, SignUpSchema } from '../schemas/auth';

export const SIGN_IN_VALUE: SignInPayload = {
  identifier: '',
  password: '',
};

export const SIGN_UP_VALUE: SignUpSchema = {
  avatar: null,
  email: '',
  username: '',
  password: '',
};
