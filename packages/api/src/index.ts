import env from '@/utils/env';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { AddressInfo } from 'node:net';

const port = env.PORT;

const app = new Hono({
  strict: false,
});

function onListening(info: AddressInfo) {
  console.log(`🔥 Listening request on port ${info.port}`);
}

serve(
  {
    port,
    fetch: app.fetch,
  },
  onListening
);

export default app;
