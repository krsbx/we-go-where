import { onErrorHandler } from '@/errors/handler';
import apiRoute from '@/routes';
import { type Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';

export function root(app: Hono) {
  app.use('*', cors());
  app.use('*', secureHeaders());
  app.onError(onErrorHandler);
  app.route('/', apiRoute);
}
