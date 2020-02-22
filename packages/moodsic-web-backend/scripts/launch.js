/* eslint-disable import/no-extraneous-dependencies */
const { argv } = require('yargs');
const { logger } = require('jege/server');

const app = require('../src/app');
const babelRc = require('./.babelrc');

const log = logger('[moodsic-web-backend]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

function launch() {
  log('launcher(): argv: %j', argv);
  app();
}

if (require.main === module) {
  launch();
}
