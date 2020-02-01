import { compose } from 'redux';
import {
  createAssetElements,
  createStingifiableObjectElement,
} from 'express-isomorphic/utils';
import { createXongkoro } from 'xongkoro';
import { logger } from 'jege/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderToStringProxy } from 'xongkoro/server';
import { ServerStyleSheet } from 'styled-components';

import index from '@@src/resources/html/templates/index';
import { initializeStore } from '@@src/universal/state';
import launcher from '@@src/resources/html/pages/launcher';
import react from '@@src/resources/html/pages/react';
import ServerApp from '@@src/server/ServerApp';

const log = logger('[sandbox-web]');

const routesDefinitions: RouteDefinitions = {
  default: rt({
    getArgs: async ({
      cssFileName,
      nadanWebEndPoint,
      socketPath,
      socketPort,
    }) => {
      const sandboxCssElement = createAssetElements([cssFileName], 'assets');

      return {
        pageArgs: {},
        templateArgs: {
          nadanWebEndPoint,
          sandboxCssElement,
          socketPath,
          socketPort,
        },
      };
    },
    page: launcher,
    template: index,
  }),
  react: rt({
    getArgs: async ({
      cssFileName,
      nadanWebEndPoint,
      reactAssets,
      requestUrl,
      routerContext,
      socketPath,
      socketPort,
    }) => {
      const reactAssetElements = createAssetElements(reactAssets, 'bundle');
      const sandboxCssElement = createAssetElements([cssFileName], 'assets');

      const reduxStore = initializeStore();
      const xongkoro = createXongkoro({
        preloadedState: {},
        ssr: true,
      });
      const nadanEnvElement = createStingifiableObjectElement('__NADAN_ENV__', getNadanEnv());

      const styledComponentsStyleSheet = new ServerStyleSheet();
      const serverSideHocs = compose<any>(
        styledComponentsStyleSheet.collectStyles.bind(styledComponentsStyleSheet),
      );
      const element = (
        <ServerApp
          reduxStore={reduxStore}
          requestUrl={requestUrl}
          routerContext={routerContext}
          xongkoro={xongkoro}
        />
      );
      const appInString = await renderToStringProxy({
        element: serverSideHocs(element),
        renderFunction: renderToString,
      });

      const xongkoroStateElement = createStingifiableObjectElement('__XONGKORO_STATE__', xongkoro.getState());
      const reduxStateElement = createStingifiableObjectElement('__REDUX_STATE__', reduxStore.getState());
      const styledComponentsStyleInString = styledComponentsStyleSheet.getStyleTags();

      return {
        pageArgs: {
          appInString,
          nadanEnvElement,
          reactAssetElements,
          reduxStateElement,
          xongkoroStateElement,
        },
        templateArgs: {
          nadanWebEndPoint,
          sandboxCssElement,
          socketPath,
          socketPort,
          styledComponentsStyleInString,
        },
      };
    },
    page: react,
    template: index,
  }),
};

const routes = (function bootstrapRoutes() {
  const result: Routes = {};
  Object.entries(routesDefinitions)
    .forEach(([routeName, route]) => {
      log(
        'bootstrapRoutes(): routeName: %s, page: %s, template: %s',
        routeName,
        route.page.name,
        route.template.name,
      );

      const render = async (routeProps: RouteProps) => {
        const {
          pageArgs,
          templateArgs,
        } = await route.getArgs(routeProps);
        const children: string = route.page(pageArgs);
        return route.template(children, templateArgs);
      };

      result[routeName] = {
        ...route,
        render,
      };
    });
  return result;
})();

export default routes;

function rt<PArgs, TArgs>(routeDefinition: RouteDefinition<PArgs, TArgs>) {
  return routeDefinition;
}

function getNadanEnv() {
  const nadanEnv = {};
  Object.keys(process.env)
    .filter((key) => key.startsWith('NADAN'))
    .forEach((key) => {
      nadanEnv[key] = process.env[key];
    });
  return nadanEnv;
}

export type Route = RouteDefinition<any, any> & {
  render: (routeProps: RouteProps) => Promise<string>;
};

export interface RouteProps {
  cssFileName: string;
  nadanWebEndPoint: string;
  reactAssets: string[];
  requestUrl: string;
  routerContext: object;
  socketPath?: string;
  socketPort?: number;
}

interface Routes {
  [routeName: string]: Route;
}

interface RouteDefinitions {
  [routeName: string]: RouteDefinition<any, any>;
}

interface RouteDefinition<PArgs, TArgs> {
  getArgs: (routeProps: RouteProps) => Promise<{
    pageArgs: PArgs;
    templateArgs: TArgs;
  }>;
  page: (args: PArgs) => string;
  template: HtmlTemplate<TArgs>;
}

type HtmlTemplate<A> = (children: string, args: A) => string;
