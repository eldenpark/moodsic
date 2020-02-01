import {
  createActionHandler,
  RawActionHandler,
} from 'aktion';

import {
  ProductEntity,
  UserEntity,
} from '@@src/universal/fetchers/entities';
import { RawActionTypeType } from './ActionType';
import { ReduxState } from './reduxState';

const rawActionHandler: RawActionHandler<RawActionTypeType, ReduxState> = {
  ADD_TO_CART: {
    base: (state: ReduxState, action) => {
      const productNo = action.payload;
      const newCart = { ...(state.cart || {}) };
      newCart[productNo] = newCart[productNo] ? newCart[productNo] + 1 : 1;
      return {
        ...state,
        cart: newCart,
      };
    },
  },
  EMPTY_CART: {
    base: (state: ReduxState) => {
      return {
        ...state,
        cart: {},
      };
    },
  },
  FETCH_AUTH_TOKEN: {
    base: (state: ReduxState) => {
      return {
        ...state,
        user: {
          loading: true,
        },
      };
    },
    error: (state: ReduxState) => {
      return {
        ...state,
        user: {
          loading: false,
        },
      };
    },
    success: (state: ReduxState, action) => {
      const { payload = {} } = action;
      return {
        ...state,
        user: {
          data: payload.user as UserEntity,
          loading: false,
        },
      };
    },
  },
  FETCH_ORDERS: {
    success: (state) => {
      return state;
    },
  },
  FETCH_PRODUCTS: {
    success: (state, action) => {
      const { payload = [] } = action;
      const result = {};
      payload.forEach((product: ProductEntity) => {
        result[product.product_no] = product;
      });
      return {
        ...state,
        products: result,
      };
    },
  },
  FETCH_PRODUCTS_BY_PRODUCT_NO_LIST: {
    success: (state, action) => {
      const { payload = [] } = action;
      const result = {};
      payload.forEach((product: ProductEntity) => {
        result[product.product_no] = product;
      });

      return {
        ...state,
        products: result,
      };
    },
  },
  FETCH_SIGN_OUT: {
    success: (state) => {
      return {
        ...state,
        cart: {},
        user: {
          data: undefined,
          loading: false,
        },
      };
    },
  },
};

export default createActionHandler(rawActionHandler);
