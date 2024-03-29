import { WebpackServerState } from 'express-isomorphic-extension/webpack';

export default class IsomorphicState implements WebpackServerState {
  assets: string[];
  buildHash: string;
  cssFileName: string;
  isReady: boolean = false;
  // nadanWebEndPoint: string;
  publicPath: string;
}
