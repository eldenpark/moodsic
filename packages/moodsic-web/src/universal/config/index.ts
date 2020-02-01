import { logger } from 'jege';

const log = logger('[moodsic-web]');

const envMissingError = new Error(
  'env is undefined. Most likely config data is not registered in window object',
);

const config: Config = (function bootstrapConfig() {
  const env = isBrowser() ? window['__FORM_ENV__'] : process.env;

  if (!env) {
    throw envMissingError;
  }

  const result = {
    NADAN_SANDBOX_API_ENDPOINT: env.NADAN_SANDBOX_API_ENDPOINT,
    NADAN_SANDBOX_WEB_PORT: env.NADAN_SANDBOX_WEB_PORT,
    NADAN_WEB_ENDPOINT: env.NADAN_WEB_ENDPOINT,
  };
  log('bootstrapConfig(): result: %o', result);

  return result;
})();

export default config;

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

interface Config {
  NADAN_SANDBOX_API_ENDPOINT: string | undefined;
  NADAN_SANDBOX_WEB_PORT: string;
  NADAN_WEB_ENDPOINT: string;
}
