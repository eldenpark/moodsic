import {
  applyMiddleware,
} from 'redux';
import { logger } from 'jege';
import thunk from 'redux-thunk';

const log = logger('[sandbox-web]');

const reduxLogger = () => (next) => (action) => {
  log('logger(): action: %s, payload: %o', action.type, action.payload);
  return next(action);
};

const enhancer = applyMiddleware(thunk, reduxLogger);

export default enhancer;
