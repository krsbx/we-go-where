import { AuthedUser } from '@/models/User';
import { type AuthEnv } from '@/routes/auth';
import { authorizeUser, changePassword, signInUser } from '@/services/auth';
import { Context, Next } from 'hono';

export function prepareAuthMw(ctx: Context<AuthEnv, '/auth'>, next: Next) {
  ctx.set('auth', {
    user: {} as AuthedUser,
  });

  ctx.set('pending', {
    user: null,
  });

  ctx.set('result', {
    user: null,
  });

  return next();
}

export async function authorizeUserMw(ctx: Context, next: Next) {
  const authorization = ctx.req.header('authorization')?.split(' ')?.pop?.();

  const user = await authorizeUser(authorization);

  ctx.set('auth', {
    ...ctx.get('auth'),
    user,
  });

  return next();
}

export async function signInUserMw(ctx: Context<AuthEnv, '/auth/signin'>) {
  const body = await ctx.req.json();
  const token = await signInUser(body);

  return ctx.json({
    token,
  });
}

export async function changePasswordMw(
  ctx: Context<AuthEnv, '/auth/change-password'>
) {
  const body = await ctx.req.json();

  await changePassword(body, ctx.get('auth').user);

  return ctx.json({
    message: 'Password changed',
  });
}
