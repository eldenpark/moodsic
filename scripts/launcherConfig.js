const NODE_ENV = process.env.NODE_ENV || 'development';
const FORM_WEB_PORT = 3001;

const launcherConfig = (() => {
  const rawConfig = {
    development: {
      FORM_WEB_PORT,
    },
    production: {},
  };
  return rawConfig[NODE_ENV];
})();

module.exports = launcherConfig;
