import React from 'react';
import {
  Provider as ReduxProvider,
} from 'react-redux';
import { StaticRouter } from 'react-router';
import { Store } from 'redux';
import {
  Xongkoro,
  XongkoroProvider,
} from 'xongkoro';

import { ReduxState } from '@@src/universal/state';
import Universal from '@@src/universal/components/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  reduxStore,
  requestUrl,
  routerContext,
  xongkoro,
}) => {
  return (
    <StaticRouter
      context={routerContext}
      location={requestUrl}
    >
      <ReduxProvider store={reduxStore}>
        <XongkoroProvider xongkoro={xongkoro}>
          <Universal />
        </XongkoroProvider>
      </ReduxProvider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  reduxStore: Store<ReduxState>;
  requestUrl: string;
  routerContext: object;
  xongkoro: Xongkoro<any>;
}
