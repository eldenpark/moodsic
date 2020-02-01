/* eslint-disable import/no-extraneous-dependencies */
const { buildLogger } = require('jege/server');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const sass = require('node-sass');

const log = buildLogger('[sandbox-web]');

const paths = {
  assets: path.resolve(__dirname, '../dist/assets'),
  build: path.resolve(__dirname, '../build'),
  dist: path.resolve(__dirname, '../dist'),
  src: path.resolve(__dirname, '../src'),
};

gulp.task('clean', () => {
  log('clean', 'distPath: %s', paths.dist);

  return del([
    `${paths.build}/**/*`,
    `${paths.dist}/**/*`,
  ]);
});

gulp.task('copy-public', () => {
  const publicPath = path.resolve(paths.src, 'public');
  log('copy-public', 'srcPath: %s, dist: %s', publicPath, paths.dist);

  return gulp.src(`${publicPath}/**/*`)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('compile-scss', () => {
  try {
    fs.mkdirSync(paths.assets, { recursive: true });

    const indexScssPath = path.resolve(paths.src, 'resources/scss/index.scss');
    const cssFileName = 'index.css';
    const indexCssPath = path.resolve(paths.assets, cssFileName);

    log('compile-scss', 'indexScssPath: %s, indexCssPath: %s', indexScssPath, indexCssPath);

    return new Promise((resolve) => {
      sass.render({
        file: indexScssPath,
        outputStyle: 'compressed',
      }, (err, { css }) => {
        fs.writeFileSync(indexCssPath, css.toString('utf-8'));
        resolve(cssFileName);
      });
    });
  } catch (err) {
    log('compile-scss', 'error occurred: %o', err);
    throw err;
  }
});

gulp.task('build-dev', gulp.series('clean', 'copy-public', 'compile-scss'));

function build(callback) {
  const buildTask = gulp.task('build-dev');
  buildTask(callback);
}

module.exports = {
  build,
  gulp,
};

if (require.main === module) {
  build();
}
