import env from '@/utils/env';
import jwtToken, { JwtPayload } from 'jsonwebtoken';

export function signJwtToken<T extends NonNullable<unknown>>(
  payload: T,
  options: jwtToken.SignOptions = {}
) {
  return jwtToken.sign(payload, env.JWT_SECRET, options);
}

export function verifyJwtToken<
  T extends NonNullable<unknown> = NonNullable<unknown>,
  U = T & JwtPayload,
>(token: string) {
  return jwtToken.verify(token, env.JWT_SECRET) as U;
}
