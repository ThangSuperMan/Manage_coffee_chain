export interface Order {
  id?: number;
  product_id: number;
  email: string;
  quantity: number;
  cashier_name: string;
  status: number;
}
