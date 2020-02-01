/* eslint-disable */
/* eslint-disable import/no-extraneous-dependencies */
const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');

const log = logger('[moodsic-web]');

// const app = require('../src/app');
const server = require('../src/spectrograph/server');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

function launch() {
  log('launcher(): argv: %j', argv);
  server();
}

if (require.main === module) {
  launch();
}
