import {
  ProductEntity,
  UserEntity,
} from '@@src/universal/fetchers/entities';

const reduxState: ReduxState = {
  cart: {},
  count: 0,
  orders: [],
  products: {},
  user: {
    loading: true,
  },
};

export default reduxState;

export interface ReduxState {
  cart: {
    [product_no: string]: number;
  };
  count: number;
  orders: any[];
  products: {
    [product_no: string]: ProductEntity;
  };
  user: {
    data?: UserEntity;
    loading?: boolean;
  };
}
