import { CartItem } from '../cart-store';

export interface Order {
  id: string;
  userId: string;
  total: number;
  items: CartItem[];
  paymentStatus: 'success' | 'failure';
}