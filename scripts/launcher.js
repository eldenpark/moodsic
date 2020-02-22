const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const os = require('os');
const path = require('path');

const { logger } = require('jege/server');

const log = logger('[monorepo-moodsic-web]');

const keyPath = path.resolve(os.homedir(), '.gcloud/key-1.json');

const processDefinitions = {
  moodsicWeb: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/moodsic-web',
      env: {
      },
      stdio: 'inherit',
    },
  ),
  moodsicWebBackend: proc(
    'node',
    [
      './scripts/launch.js',
    ],
    {
      cwd: './packages/moodsic-web-backend',
      env: {
        GOOGLE_APPLICATION_CREDENTIALS: keyPath,
      },
      stdio: 'inherit',
    },
  ),
  spectrogramCreator: proc(
    'python3',
    [
      './app.py',
    ],
    {
      cwd: './packages/spectrogram-creator',
      stdio: 'inherit',
    },
  ),
};

const processGroupDefinitions = {
  default: [
    'moodsicWeb',
  ],
};

function launcher() {
  try {
    log(
      'launcher(): argv: %j, Processes defined: %j, ProcessGroupDefinitions: %j',
      argv,
      Object.keys(processDefinitions),
      processGroupDefinitions,
    );

    const Launcher = createLauncher({
      processDefinitions,
      processGroupDefinitions,
    });

    Launcher.run({
      process: argv.process,
    });
  } catch (err) {
    log('launcher(): error reading file', err);
  }
}

if (require.main === module) {
  launcher();
}
