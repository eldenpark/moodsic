import { createActionType } from 'aktion';

const rawActionType: RawActionTypeType = {
  ADD_TO_CART: 0,
  EMPTY_CART: 0,
  FETCH_AUTH_TOKEN: 0,
  FETCH_ORDERS: 0,
  FETCH_PRODUCTS: 0,
  FETCH_PRODUCTS_BY_PRODUCT_NO_LIST: 0,
  FETCH_SIGN_OUT: 0,
};

export default createActionType(rawActionType);

export interface RawActionTypeType extends ZeroValueObjectType {
  ADD_TO_CART: 0;
  EMPTY_CART: 0;
  FETCH_AUTH_TOKEN: 0;
  FETCH_ORDERS: 0;
  FETCH_PRODUCTS: 0;
  FETCH_PRODUCTS_BY_PRODUCT_NO_LIST: 0;
  FETCH_SIGN_OUT: 0;
}

interface ZeroValueObjectType {
  [key: string]: 0;
}
