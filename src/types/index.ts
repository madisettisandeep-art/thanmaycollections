export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_path: string;
  alt_text: string | null;
  display_order: number;
}

export interface Product {
  id: string;
  product_code: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  category_id: string | null;
  stock_quantity: number;
  material: string | null;
  occasion: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  category?: Category;
  images?: ProductImage[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string | null;
  consent: boolean;
}

export type OrderStatus =
  | 'Pending'
  | 'Awaiting WhatsApp Confirmation'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string | null;
  product_name_snapshot: string;
  product_code_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  line_total: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  city: string;
  state: string;
  pincode: string;
  subtotal: number;
  order_status: OrderStatus;
  customer_consent: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface InventoryLog {
  id: string;
  product_id: string;
  previous_quantity: number;
  new_quantity: number;
  adjustment_reason: string;
  admin_id?: string | null;
  created_at: string;
  product?: Product;
}

export interface AuditLog {
  id: string;
  admin_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface ContactEnquiry {
  id: string;
  customer_name: string;
  contact_number: string;
  message: string;
  consent: boolean;
  is_read: boolean;
  created_at: string;
}
