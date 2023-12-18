import { type AuthedUser } from '@/models/User';
import { type UserEnv } from '@/routes/users';
import { getPageLimit } from '@/services/setup';
import {
  createUser,
  deleteUser,
  getUserByUserId,
  updateUser,
} from '@/services/users';
import { type Context, type Next } from 'hono';
import _ from 'lodash';

export function prepareUserMw(ctx: Context<UserEnv, '/users'>, next: Next) {
  const { page, limit, offset } = getPageLimit(ctx.req.query());

  ctx.set('auth', {
    user: {} as AuthedUser,
  });

  ctx.set('pending', {
    user: null,
    users: [],
  });

  ctx.set('result', {
    user: null,
    users: [],
    total: 0,
    offset,
    limit,
    page,
  });

  return next();
}

export async function createUserMw(
  ctx: Context<UserEnv, '/users'>,
  next: Next
) {
  const body = await ctx.req.json();
  const user = await createUser(body);

  ctx.set('result', {
    ...ctx.get('result'),
    user,
  });

  return next();
}

export async function getUserByUserIdMw(
  ctx: Context<UserEnv, '/users/:userId'>,
  next: Next
) {
  const user = await getUserByUserId(ctx.req.param('userId'));

  ctx.set('result', {
    ...ctx.get('result'),
    user,
  });

  return next();
}

export async function updateUserMw(
  ctx: Context<UserEnv, '/users/:userId'>,
  next: Next
) {
  const body = await ctx.req.json();

  const user = await updateUser(
    body,
    ctx.get('result').user,
    ctx.get('auth').user
  );

  ctx.set('result', {
    ...ctx.get('result'),
    user,
  });

  return next();
}

export async function deleteUserMw(ctx: Context<UserEnv, '/users/:userId'>) {
  await deleteUser(ctx.get('result').user, ctx.get('auth').user);

  return ctx.body(null, 204);
}

export async function returnUserMw(
  ctx: Context<UserEnv, '/users' | '/users/:userId'>
) {
  const result = ctx.get('result').user?.toJSON?.();
  const statusCode = result ? 200 : 404;

  return ctx.json(_.omit(result, ['password']), statusCode);
}
