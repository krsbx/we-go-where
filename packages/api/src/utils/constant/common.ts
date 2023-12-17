import path from 'node:path';

export const APP_ROOT_PATH = path.resolve(__dirname, '../../..');

export const APP_LOG_PATH = path.resolve(APP_ROOT_PATH, 'logs');

export const APP_SRC_PATH = path.resolve(APP_ROOT_PATH, 'src');

export const ASSETS_PATH = path.resolve(APP_ROOT_PATH, 'assets');

export const TIME_PERIOD = {
  SECOND: 1000, // from ms
  get MINUTE() {
    return this.SECOND * 60;
  },
  get HOUR() {
    return this.MINUTE * 60;
  },
  get DAY() {
    return this.HOUR * 24;
  },
};
