const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

const port = 4001;

const app = express();

module.exports = function server() {
  console.log('server(): launching...');

  app.use(cors());
 
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use('*', (req, res) => {
    console.log(1111, req.body);

    res.send({
      power: 1
    });
  });
  
  app.listen(port, () => {
    console.log('listening on port: %s', port);
  });
};
