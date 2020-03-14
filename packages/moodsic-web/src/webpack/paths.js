const path = require('path');

const root = path.resolve(__dirname, '../../');
const projectRoot = path.resolve(__dirname, '../../../../');

module.exports = {
  build: path.resolve(root, 'build'),
  dist: path.resolve(projectRoot, 'docs'),
  src: path.resolve(root, 'src'),
};
