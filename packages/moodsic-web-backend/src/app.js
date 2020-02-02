const axios = require('axios');
const bodyParser = require('body-parser');
const childProcess = require('child_process');
const cors = require('cors');
const del = require('del');
const express = require('express');
const fs = require('fs');
const { logger } = require('jege/server');
const multer = require('multer');
const path = require('path');

const port = 4001;

const paths = {
  audioPath: path.resolve(__dirname, '../audio'),
  creatorPath: path.resolve(__dirname, '../../spectrogram-creator/app.py'),
  imagesPath: path.resolve(__dirname, '../images'),
  spectrogramPath: path.resolve(__dirname, '../../spectrogram-creator'),
};

const log = logger('[moodsic-web-backend]');
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paths.audioPath);
  },
  filename: (req, file, cb) => {
    log('diskStorage(): file will be stored at: %s/%s', paths.audioPath, file.originalname);
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
    log('/uploads: files: %j', req.files);

    childProcess.execSync(`python3 ${paths.creatorPath} ${paths.audioPath} ${paths.imagesPath}`, {
      cwd: paths.spectrogramPath,
      shell: process.env.SHELL,
      stdio: 'inherit',
    });

    const files = req.files.map((file) => {
      const imgPath = path.resolve(paths.imagesPath, `${file.originalname}.png`);
      log('/uploads: processing imgFile: %s', imgPath);

      if (!fs.existsSync(imgPath)) {
        log('/uploads: image is not found, imgPath: %s', imgPath);
        res.send({
          error: true,
          payload: {
            msg: "spectrogram creation might have failed",
            filename: file.originalname,
          },
        });
        throw new Error('image is not found');
      }

      const imageBytes = fs.readFileSync(imgPath).toString('base64');

      return axios.request({
        data: {
          "payload": {
            "image": {
              imageBytes,
            },
          },
        },
        headers: {
          Authorization: 'Bearer ya29.c.Ko8BvAdZDcGvjOb4gjMIPRwneVw6T6udIRAwFrpmC3gob9JJOAPSnc2c8wHm9hj-Xcmm7YU7MdEhKMGYU4blbkFpDUutqMI1nik05x3wlZim8l1TRQcMBBT-abLMbwMIueEI5YTeY5txfZc-WfK8QrUavmMSmMZ5NXeEhgGHJbilMeE-PWO1OQsKD7Xvuz2-bog',
          'Content-Type': 'application/json',
        },
        method: 'post',
        url: 'https://automl.googleapis.com/v1beta1/projects/670091185417/locations/us-central1/models/ICN3559756855855022080:predict',
      })
        .then(({ data }) => {
          log('/uploads: gcloud prediction, filename: %s, gcloud response: %j', file.originalname, data);

          return {
            filename: file.originalname,
            result: data.payload,
          };
        })
        .catch((err) => {
          log(
            '/uploads: request failed, filename: %s, err.message: %s, err.response',
            file.originalname,
            err.message,
            err.response,
          );
        });
    });

    Promise.all(files)
      .then((result) => {
        res.send({
          error: false,
          payload: result,
        });
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
  const { audioPath, creatorPath, imagesPath } = paths;
  log(
    'bootstrap(): $SHELL: %s, audioPath: %s, creatorPath: %s',
    process.env.SHELL,
    audioPath,
    creatorPath,
  );

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
    });
  }

  if (fs.existsSync(creatorPath)) {
    log('bootstrap(): found creatorPath at: %s', creatorPath);
  } else {
    log('bootstrap(): creator does not exist at: %s', creatorPath);
    throw new Error('creator does not exist');
  }

  if (fs.existsSync(imagesPath)) {
    log('bootstrap(): found imagesPath at: %s', imagesPath);
  } else {
    log('bootstrap(): imagesPath does not exist at: %s', imagesPath);
    throw new Error('imagesPath does not exist');
  }
}
