const { argv } = require('yargs');
const { createLauncher, proc } = require('process-launch');
const { logger } = require('jege/server');

const launcherConfig = require('./launcherConfig');

const cwd = process.cwd();
const log = logger('[nadan-web]');

const buildOrder = [
  'nadanWeb',
];

const processDefinitions = {
  nadanWeb: proc(
    'node',
    [
      './scripts/build.js',
    ],
    {
      cwd: './packages/nadan-web',
      env: {
        NADAN_WEB_CORE_ENDPOINT: launcherConfig.NADAN_WEB_CORE_ENDPOINT,
      },
      stdio: 'inherit',
    },
  ),
};

async function builder() {
  log('builder(): start building, cwd: %s, argv: %j', cwd, argv);

  try {
    const Launcher = createLauncher({
      processDefinitions,
    });

    Launcher.runInSequence({
      order: buildOrder,
    });
  } catch (err) {
    log('builder(): error', err);
  }
}

if (require.main === module) {
  builder();
}
