const axios = require('axios');
const bodyParser = require('body-parser');
const childProcess = require('child_process');
const cors = require('cors');
const del = require('del');
const express = require('express');
const fs = require('fs');
const { logger } = require('jege/server');
const multer = require('multer');
const os = require('os');
const path = require('path');
const { PredictionServiceClient } = require(`@google-cloud/automl`).v1;

const port = 4001;

const paths = {
  audioPath: path.resolve(__dirname, '../audio'),
  creatorPath: path.resolve(__dirname, '../../spectrogram-creator/app.py'),
  imagesPath: path.resolve(__dirname, '../images'),
  modelPath: path.resolve(__dirname, '../models/model-1.json'),
  spectrogramPath: path.resolve(__dirname, '../../spectrogram-creator'),
};

const log = logger('[moodsic-web-backend]');
const app = express();
const predictionClient = new PredictionServiceClient();

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
  const model = require(paths.modelPath);
  log('server(): found model: %j', model);

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

    const files = req.files.map(async (file) => {
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

      const request = {
        name: predictionClient.modelPath(
          model.projectId,
          model.location,
          model.modelId,
        ),
        payload: {
          image: {
            imageBytes,
          },
        },
      };
      const [response] = await predictionClient.predict(request);
      return {
        filename: file.originalname,
        result: response.payload,
      };
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
  const { audioPath, creatorPath, imagesPath, modelPath } = paths;
  log(
    'bootstrap(): $SHELL: %s, audioPath: %s, creatorPath: %s, modelPath: %s',
    process.env.SHELL,
    audioPath,
    creatorPath,
    modelPath,
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

  if (fs.existsSync(modelPath)) {
    log('bootstrap(): found modelPath at: %s', modelPath);
  } else {
    log('bootstrap(): modelPath does not exist at: %s', modelPath);
    throw new Error('modelPath does not exist');
  }
}
