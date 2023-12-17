import { configDotenv } from 'dotenv';
import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { APP_ROOT_PATH } from './constant/common';

const envPath = path.resolve(
  APP_ROOT_PATH,
  _.compact(['.env', process.env.NODE_ENV]).join('.')
);

if (fs.existsSync(envPath)) {
  configDotenv({
    path: envPath,
  });
} else {
  configDotenv({
    path: path.resolve(APP_ROOT_PATH, '.env'),
  });
}

const envSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((s) => +s),

  SALT_ROUND: z.string().transform((s) => +s),
  JWT_SECRET: z.string(),

  NODE_ENV: z.string().default(''),
});

export default envSchema.parse(process.env);
