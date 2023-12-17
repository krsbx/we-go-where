import RequestError from '@/errors/RequestError';
import UserModel, { AuthedUser } from '@/models/User';
import { signInSchema } from '@/schemas/users';
import { signJwtToken, verifyJwtToken } from '@/utils/jwt';
import _ from 'lodash';
import { validateUserEntity } from '../users/helper';
import { compareUserPassword } from './helper';

export async function signInUser(payload: unknown) {
  const body = signInSchema.parse(payload);
  const isEmail = !_.isEmpty(body.email);

  const key = isEmail ? 'email' : 'username';
  const request = {
    [key]: body[key],
  };

  const user = await UserModel.findOne(request);

  validateUserEntity(user);

  await compareUserPassword(user, body);

  const token = signJwtToken(_.omit(user.toJSON(), ['password']));

  return token;
}

export async function authorizeUser(token: string | undefined) {
  if (!token) {
    throw new RequestError({
      message: 'Unauthorized',
      statusCode: 401,
      errors: null,
    });
  }

  const user = verifyJwtToken<AuthedUser>(token);

  return user;
}
