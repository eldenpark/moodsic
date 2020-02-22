const { argv } = require('yargs');
const { logger } = require('jege/server');

const babelRc = require('./.babelrc');
const { gulp } = require('./build');

const log = logger('[moodsic-web]');

require('@babel/register')({
  ...babelRc,
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});

function launch() {
  log('launch(): argv: %j, NODE_ENV: %s', argv, process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'production') {
    const buildTask = gulp.task('build');
    buildTask(() => {
      const serverProd = require('../src/server/index.production').default;
      serverProd();
    });
  } else {
    const server = require('../src/server/index.local').default;
    server();
  }
}

if (require.main === module) {
  launch();
}
