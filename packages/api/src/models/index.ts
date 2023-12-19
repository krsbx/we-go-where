// Sync model to mongodb

import { type Model } from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';

const basename = path.basename(__filename);

const dbs = {} as Record<string, Model<NonNullable<unknown>>>;

fs.readdirSync(__dirname)
  .filter((file) => {
    const isNotTest =
      file.indexOf('.test.ts') === -1 || file.indexOf('.test.js') === -1;
    const isModel = file.slice(-3) === '.ts' || file.slice(-3) === '.js';

    return file.indexOf('.') !== 0 && file !== basename && isModel && isNotTest;
  })
  .forEach((model) => {
    const db = require(path.join(__dirname, model)).default;

    Object.assign(dbs, {
      [model]: db,
    });
  });
