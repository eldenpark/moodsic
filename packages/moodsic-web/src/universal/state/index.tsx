import {
  createStore,
  Store,
} from 'redux';
import { logger } from 'jege';
import { useDispatch as _useDispatch } from 'react-redux';

import * as Action from './thunkedActions';
import ActionType from './ActionType';
import actionHandler from './actionHandler';
import enhancer from './enhancer';
import reduxState, { ReduxState } from './reduxState';

const log = logger('[sandbox-web]');

function initializeStore({
  preloadedState = reduxState,
}: InitializeStoreArgs<ReduxState> = {}): Store<ReduxState> {
  const store = createStore(reducer, preloadedState, enhancer);
  return store;
}

export default function reducer(state: ReduxState, action) {
  try {
    const relevantActionHandler = actionHandler[action.type]
      || actionHandler.default;
    return relevantActionHandler(state, action);
  } catch (err) {
    log('reducer(): error: %o', err);
    return state;
  }
}

export {
  Action,
  ActionType,
  initializeStore,
};

export type ReduxState = ReduxState;

export const useDispatch = _useDispatch as () => (...args) => Promise<any>;

interface InitializeStoreArgs<S> {
  preloadedState?: S;
}
