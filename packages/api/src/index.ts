import env from '@/utils/env';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { AddressInfo } from 'node:net';
import mongodb from './bin/mongodb';
import { root } from './utils/root';

const port = env.PORT;

const app = new Hono({
  strict: false,
});

function onListening(info: AddressInfo) {
  console.log(`🔥 Listening request on port ${info.port}`);
}

async function main() {
  await mongodb;

  root(app);

  serve(
    {
      port,
      fetch: app.fetch,
    },
    onListening
  );
}

main();
