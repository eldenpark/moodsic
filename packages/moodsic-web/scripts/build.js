/* eslint-disable import/no-extraneous-dependencies */
const { buildLogger } = require('jege/server');
const del = require('del');
// const fs = require('fs');
const gulp = require('gulp');
const path = require('path');

const log = buildLogger('[moodsic-web]');

const paths = {
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

gulp.task('build', gulp.series('clean', 'copy-public'));

function build(callback) {
  const buildTask = gulp.task('build');
  buildTask(callback);
}

module.exports = {
  build,
  gulp,
};

if (require.main === module) {
  build();
}
