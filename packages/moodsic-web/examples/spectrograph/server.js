const { logger } = require('jege/server');
const express = require('express');

const port = 4001;
const log = logger('[moodsic-data-generator]');

module.exports = function server() {
  const app = express();

  app.listen(port, () => {
    log('server(): listening on port: %s', port);
  });
};
