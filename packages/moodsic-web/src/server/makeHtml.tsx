import {
  createAssetElements,
  createStringifiableObjectElement,
} from 'express-isomorphic/utils';
import { createXongkoro } from 'xongkoro';
import { dom } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderToStringProxy } from 'xongkoro/server';

import { logger } from 'jege/server';
import { MakeHtml } from 'express-isomorphic';

import IsomorphicState from './IsomorphicState';
import ServerApp from '@@src/server/ServerApp';

const log = logger('[moodsic-web]');

const makeHtml: MakeHtml<IsomorphicState> = async ({
  requestUrl,
  serverState,
}) => {
  log('makeHtml');

  const { socketPath, socketPort, state } = serverState;
  const {
    assets,
    publicPath,
  } = state;

  const xongkoro = createXongkoro({
    preloadedState: {},
    ssr: true,
  });
  const reactAssetElements = createAssetElements(assets, publicPath);
  const processEnvElement = createStringifiableObjectElement('__FORM_ENV__', getProcessEnv('FORM'));

  const element = (
    <ServerApp
      requestUrl={requestUrl}
      routerContext={{}}
      xongkoro={xongkoro}
    />
  );
  const reactAppInString = await renderToStringProxy({
    element,
    renderFunction: renderToString,
  });

  const html = template({
    fontAwesomeCss: dom.css(),
    processEnvElement,
    reactAppInString,
    reactAssetElements,
    socketPath,
    socketPort,
  });
  return html;
};

function template({
  fontAwesomeCss,
  processEnvElement,
  reactAppInString,
  reactAssetElements,
  socketPath,
  socketPort,
}) {
  return `
<html>
  <head>
    <title>Moodsic: Mood classify sound</title>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0 name="viewport">
    <link rel="icon" href="/moodsic/favicon.png">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu+Mono&display=swap" rel="stylesheet">
    <style>${fontAwesomeCss}</style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />
    ${processEnvElement}
  </head>
  <div id="react-root">${reactAppInString}</div>
  ${reactAssetElements}
  <script>
    if (window.io) {
      var socket = io('http://localhost:${socketPort}', {
        path: '${socketPath}'
      });
      socket.on('express-isomorphic', function ({ msg }) {
        console.warn('[express-isomorphic] %s', msg);
      });
    }
  </script>
</html>
`;
}

function getProcessEnv(prefix) {
  if (prefix === undefined || prefix.length < 1) {
    throw new Error('getProcessEnv(): prefix is not defined');
  }

  const env = {};
  Object.keys(process.env)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => {
      env[key] = process.env[key];
    });
  return env;
}

export default makeHtml;
