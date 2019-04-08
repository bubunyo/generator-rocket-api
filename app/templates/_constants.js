import opts from '../db/config';
import { version } from '../../package.json';

const defaultConfig = {
  v: `${version}-${process.env.NODE_ENV}`,
  ENV: process.env.NODE_ENV,
};

const devConfig = {
  DB_NAME: opts.development.database,
  DB_USER: opts.development.username,
  DB_PASS: opts.development.password,
  JWT_SECRET: '<%= (Math.random()*1e256).toString(36) %>',
  PORT: process.env.PORT || 3000,
  ...defaultConfig,
};

const testConfig = {
  DB_NAME: opts.test.database,
  DB_USER: opts.test.username,
  DB_PASS: opts.test.password,
  JWT_SECRET: '<%= (Math.random()*1e256).toString(36) %>',
  PORT: 4000,
  ...defaultConfig,
};

const prodConfig = {
  DB_NAME: opts.production.database,
  DB_USER: opts.production.username,
  DB_PASS: opts.production.password,
  DB_HOSTNAME: opts.production.host,
  JWT_SECRET: process.env.JWT_SECRET || '<%= (Math.random()*1e256).toString(36) %>',
  PORT: process.env.PORT || 5000,
  ...defaultConfig,
};
const stageConfig = {
  DB_NAME: opts.production.database,
  DB_USER: opts.production.username,
  DB_PASS: opts.production.password,
  DB_HOSTNAME: opts.production.host,
  JWT_SECRET: process.env.JWT_SECRET || '<%= (Math.random()*1e256).toString(36) %>',
  PORT: process.env.PORT || 5000,
  ...defaultConfig,
};


export function envConfig(env = process.env.NODE_ENV) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    case 'stage':
      return stageConfig;
    default:
      return prodConfig;
  }
}
export const isProduction = () => process.env.NODE_ENV === 'production';
export const isStage = () => process.env.NODE_ENV === 'stage';
export const isDev = () => process.env.NODE_ENV === 'development';
export const isTest = () => process.env.NODE_ENV === 'test';

export default {
  ...envConfig(),
};
