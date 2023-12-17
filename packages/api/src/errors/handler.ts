import { Context, Env } from 'hono';
import { JsonWebTokenError } from 'jsonwebtoken';
import _ from 'lodash';
import { ZodError } from 'zod';
import RequestError from './RequestError';

export function onErrorHandler(err: Error, ctx: Context<Env>) {
  const isValidationError = err instanceof ZodError;

  if (isValidationError) {
    const response = _.pick(err, ['name', 'message', 'errors']);

    return ctx.json(response, 400);
  }

  if (err instanceof RequestError) {
    return ctx.json(_.pick(err, ['name', 'message', 'errors']), err.statusCode);
  }

  if (err instanceof JsonWebTokenError) {
    return ctx.json(_.pick(err, ['name', 'message']), 401);
  }

  return ctx.json(_.pick(err, ['name', 'message']), 500);
}
