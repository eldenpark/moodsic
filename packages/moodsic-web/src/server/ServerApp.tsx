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

import Universal from '@@src/universal/components/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  requestUrl,
  routerContext,
  xongkoro,
}) => {
  return (
    <StaticRouter
      context={routerContext}
      location={requestUrl}
    >
        <Universal />
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  requestUrl: string;
  routerContext: object;
  xongkoro: Xongkoro<any>;
}
