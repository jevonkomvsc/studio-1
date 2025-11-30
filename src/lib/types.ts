export type UserRole = 'buyer' | 'vendor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  avatar: string;
}

export type HalalRequestStatus = 'pending' | 'processing' | 'revision' | 'done';

export interface HalalRequest {
  request_id: string;
  buyer_id: string;
  vendor_id?: string;
  status: HalalRequestStatus;
  documents: string[]; // URLs or file names
  progress_percent: number;
  ukmName: string;
  createdAt: string;
}

export interface Product {
  product_id: string;
  vendor_id: string;
  name: string;
  stock: number;
  unit: string;
  contract_price: number;
  imageUrl: string;
  imageHint: string;
}

export interface Contract {
  contract_id: string;
  buyer_id: string;
  vendor_id: string;
  product_id: string;
  start_date: string;
  end_date: string;
  monthly_delivery: number;
  status: 'active' | 'expired';
}

export interface Order {
  order_id: string;
  contract_id: string;
  delivery_date: string;
  status: 'pending' | 'shipped' | 'delivered';
}
