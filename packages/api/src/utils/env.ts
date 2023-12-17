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

const envSchema = z
  .object({
    PORT: z
      .string()
      .default('3000')
      .transform((s) => +s),

    SALT_ROUND: z.string().transform((s) => +s),
    JWT_SECRET: z.string(),

    MONGO_USERNAME: z.string(),
    MONGO_PASSWORD: z.string(),
    MONGO_DB: z.string(),
    MONGO_HOST: z.string(),
    MONGO_URI: z.string().default(''),

    NODE_ENV: z.string().default(''),
  })
  .superRefine((data) => {
    data.MONGO_URI = `mongodb+srv://${data.MONGO_USERNAME}:${data.MONGO_PASSWORD}@${data.MONGO_HOST}/${data.MONGO_DB}?retryWrites=true&w=majority`;
  });

export default envSchema.parse(process.env);
