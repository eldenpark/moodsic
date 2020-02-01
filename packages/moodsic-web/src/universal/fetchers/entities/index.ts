export interface OrderEntity {
  created_at: string;
  currency: string;
  id: number;
  img_url: string;
  label: string;
  order_no: string;
  paid_at: Date;
  payment_status: 'P' | 'U' | 'I';
  price: number;
  product_no: string;
  quantity: number;
  row_status: string;
  transaction_amount: number;
  updated_at: string;
}

export interface ProductEntity {
  created_at: string;
  currency: string;
  id: number;
  img_url: string;
  label: string;
  price: number;
  product_no: string;
  row_status: string;
  updated_at: string;
}

export interface UserEntity {
  created_at: string;
  email: string;
  user_no: string;
  username: string;
}
