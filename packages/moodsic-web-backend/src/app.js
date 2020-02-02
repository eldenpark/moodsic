const bodyParser = require('body-parser');
const childProcess = require('child_process');
const cors = require('cors');
const del = require('del');
const express = require('express');
const fs = require('fs');
const { logger } = require('jege/server');
const multer = require('multer');
const path = require('path');

const audioPath = path.resolve(__dirname, '../audio');
const port = 4001;
const state = {
  creatorPath: undefined,
};

const log = logger('[moodsic-web-backend]');
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, audioPath);
  },
  filename: (req, file, cb) => {
    log('diskStorage(): file will be stored at: %s/%s', audioPath, file.originalname);
    cb(null, file.originalname);
  },
});

const uploads = multer({
  storage,
});

module.exports = function server() {
  log('server(): launching...');
  bootstrap();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post('/uploads', uploads.array('files'), (req, res) => {
    log('/uploads: files: %o', req.files);

    const filenames = req.files.map((file) => ({
      originalname: file.originalname,
    }));

    res.send({
      filenames,
    });
  });

  app.use('*', (req, res) => {
    res.send({
      error: true,
    });
  });

  app.listen(port, () => {
    console.log('listening on port: %s', port);
  });
};

function bootstrap() {
  const creatorPath = path.resolve(__dirname, '../../spectrogram-creator/app.py');
  log('bootstrap(): audioPath: %s, creatorPath: %s', audioPath, creatorPath);

  if (!fs.existsSync(audioPath)) {
    log('bootstrap(): audioPath does not exists at: %s', audioPath);
    throw new Error('audioPath does not exist');
  } else {
    log('bodystrap(): found audioPath, removing files...');
    fs.readdir(audioPath, function(err, files) {
      if (err) {
        log("bootstrap(): Error getting directory information.")
      } else {
        files.forEach(function(file) {
          if (file.endsWith('.wav')) {
            const realPath = path.resolve(audioPath, file);
            log('bootstrap(): clean file: %s', realPath);
            del.sync(realPath);
          }
        })
      }
    })
  }

  if (fs.existsSync(creatorPath)) {
    state.creatorPath = creatorPath;
    log('bootstrap(): found creatorPath at: %s', creatorPath);
  } else {
    log('bootstrap(): creator does not exist at: %s', creatorPath);
    throw new Error('creator does not exist');
  }
}
