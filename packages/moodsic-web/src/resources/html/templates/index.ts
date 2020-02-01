import { requireNonEmpty } from 'objekt';

export default function index(children, {
  nadanWebEndPoint,
  sandboxCssElement,
  socketPath,
  socketPort,
  styledComponentsStyleInString = '',
}) {
  requireNonEmpty(sandboxCssElement, 'sandboxCssElement must be provided');
  requireNonEmpty(nadanWebEndPoint, 'nadanWebEndPoint must be provided');
  requireNonEmpty(socketPath);
  requireNonEmpty(socketPort);

  return `
<html>
  <head>
    <meta charset="UTF-8">
    <title>
      nadan-web: sandbox-web
    </title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
    <script src="${nadanWebEndPoint}"></script>
    ${sandboxCssElement}
    ${styledComponentsStyleInString}
  </head>
  <body>
    <div class="body-wrapper">
      <div class="leftbar">
        <div class="logo">
          <p>Nadan</p>
          <p>Sandbox Web</p>
        </div>
        <div class="launch-preconfig">
          <div>
            <ul>
              <li>
                <a href="/">Launcher</a>
              </li>
            </ul>
          </div>
          <div class="launch-list">
            <div class="list-title">
              <p>Launch List</p>
            </div>
            <ul>
              <li>
                <a>
                  /react?foo=1&bar=2&baz=3
                </a>
              </li>
              <li>
                <a>/react?foo=1</a>
              </li>
              <li>
                <a>
                  /react?foo=1&bar=2&baz=3
                </a>
              </li>
              <li>
                <a>/react?foo=1</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page">
        ${children}
      </div>
    </div>
  </body>
  <script>
    if (window.io) {
      var socket = io('http://localhost:${socketPort}', {
        path: '${socketPath}'
      });
      socket.on('express-isomorphic', function ({ msg }) {
        console.warn('[express-isomorphic] %s', msg);
      });
      socket.on('dev-server', function ({ msg }) {
        console.warn('[dev-server] %s', msg);
      });
    }
  </script>
</html>
`;
}
