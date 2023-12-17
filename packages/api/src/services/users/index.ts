import UserModel, { type AuthedUser, type User } from '@/models/User';
import { createSchema, updateSchema } from '@/schemas/users';
import { hashText } from '@/utils/hashing';
import _ from 'lodash';
import {
  checkUserExists,
  validateUserAccess,
  validateUserEntity,
} from './helper';

export async function createUser(body: unknown) {
  const payload = createSchema.parse(body);
  payload.password = await hashText(payload.password);

  await checkUserExists(payload);
  const user = await UserModel.create(payload);

  return user;
}

export async function updateUser(
  body: unknown,
  user: User | null,
  authedUser: AuthedUser
) {
  validateUserEntity(user);
  validateUserAccess(user, authedUser);

  const payload = updateSchema.parse(body);

  await checkUserExists({ ...payload, userId: user.id });

  _.forEach(payload, (value, key) => {
    // eslint-disable-next-line no-param-reassign
    user[key as keyof User] = value as never;
  });

  await user.save();

  return user;
}

export async function getUserByUserId(userId: string) {
  const user = await UserModel.findById(userId);

  validateUserEntity(user);

  return user;
}

export async function deleteUser(user: User | null, authedUser: AuthedUser) {
  validateUserEntity(user);
  validateUserAccess(user, authedUser);

  await user.deleteOne();
}
