import axios from 'axios';

import ActionType from './ActionType';
import config from '@@src/universal/config';

const axiosInstance = axios.create({
  baseURL: config.NADAN_SANDBOX_API_ENDPOINT,
  timeout: 7000,
  withCredentials: true,
});

export const getAuthToken = createThunkedAction({
  actionType: ActionType.FETCH_AUTH_TOKEN.Base,
  routine: async ({
    email,
    password,
  } = {}) => {
    const { data } = await axiosInstance.post('/session', {
      email,
      password,
    });

    return data;
  },
});

export const signOutUser = createThunkedAction({
  actionType: ActionType.FETCH_SIGN_OUT.Base,
  routine: async () => {
    const { data } = await axiosInstance.delete('/session');
    return data;
  },
});

function createThunkedAction({
  actionType,
  routine,
}: {
  actionType: string;
  routine: Routine;
}) {
  return (params?) => async (dispatch) => {
    dispatch({
      type: actionType,
    });

    const { error, payload } = await routine(params);

    if (error) {
      return dispatch({
        error: true,
        payload,
        type: `${actionType}_ERROR`,
      });
    }

    return dispatch({
      payload,
      type: `${actionType}_SUCCESS`,
    });
  };
}

interface Routine {
  (...args): Promise<{
    error?: boolean;
    meta?: any;
    payload?: any;
  }>;
}
