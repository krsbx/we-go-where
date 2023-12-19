import { SignInPayload, SignUpSchema } from '../schemas/auth';
import { ChargeSchema, CreditCardSchema } from '../schemas/card';

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

export const CREDIT_CARD_VALUE: CreditCardSchema = {
  cardHolder: '',
  number: '',
  expiryDate: '',
  cvv: '',
};

export const CHARGE_VALUE: ChargeSchema = {
  amount: '',
  currency: 'THB',
};
