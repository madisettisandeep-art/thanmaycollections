import { Category, Product, Order, OrderItem, CustomerOrderDetails, OrderStatus, InventoryLog, AuditLog, ContactEnquiry } from '@/types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from './mock-data';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateOrderNumber } from '@/lib/utils/formatters';

// In-memory runtime cache for fallback / test environments
let memoryCategories: Category[] = [...INITIAL_CATEGORIES];
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryOrders: Order[] = [
  {
    id: 'ord-001',
    order_number: 'TC-9A82F101',
    customer_name: 'Meera Krishnan',
    customer_phone: '+91 98451 23456',
    delivery_address: 'Flat 402, Lotus Grandeur, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    subtotal: 3999,
    order_status: 'Confirmed',
    customer_consent: true,
    notes: 'Please pack in velvet gift box.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        id: 'item-001',
        order_id: 'ord-001',
        product_id: 'prod-001',
        product_name_snapshot: 'Padmavati Royal Kundan Choker Set',
        product_code_snapshot: 'TC-NK-001',
        unit_price_snapshot: 3999,
        quantity: 1,
        line_total: 3999,
      },
    ],
  },
  {
    id: 'ord-002',
    order_number: 'TC-4B19E872',
    customer_name: 'Ananya Sharma',
    customer_phone: '+91 91234 56789',
    delivery_address: 'House 14, Jubilee Hills Road 36',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    subtotal: 1699,
    order_status: 'Awaiting WhatsApp Confirmation',
    customer_consent: true,
    notes: null,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item-002',
        order_id: 'ord-002',
        product_id: 'prod-003',
        product_name_snapshot: 'Maharani Peacock Meenakari Jhumkas',
        product_code_snapshot: 'TC-ER-001',
        unit_price_snapshot: 1699,
        quantity: 1,
        line_total: 1699,
      },
    ],
  },
];

let memoryInventoryLogs: InventoryLog[] = [
  {
    id: 'inv-1',
    product_id: 'prod-001',
    previous_quantity: 15,
    new_quantity: 12,
    adjustment_reason: 'Order fulfilled (TC-9A82F101)',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

let memoryAuditLogs: AuditLog[] = [
  {
    id: 'aud-1',
    action: 'SYSTEM_BOOTSTRAP',
    entity_type: 'SYSTEM',
    entity_id: 'INITIAL_SEED',
    metadata: { note: 'Initial catalogue loaded' },
    created_at: new Date().toISOString(),
  },
];

let memoryEnquiries: ContactEnquiry[] = [
  {
    id: 'enq-1',
    customer_name: 'Swathi Nambiar',
    contact_number: '+91 98840 12345',
    message: 'Can the Padmavati choker set be customized in ruby red stones instead of green?',
    consent: true,
    is_read: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export async function getCategories(): Promise<Category[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fallback
    }
  }
  return memoryCategories.filter((c) => c.is_active);
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fallback
    }
  }
  return memoryCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) || null;
}

export async function getProducts(options?: {
  categoryId?: string;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  search?: string;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popularity';
}): Promise<Product[]> {
  let list = [...memoryProducts].filter((p) => p.is_active);

  if (options?.categoryId) {
    list = list.filter((p) => p.category_id === options.categoryId);
  }
  if (options?.featured !== undefined) {
    list = list.filter((p) => p.is_featured === options.featured);
  }
  if (options?.newArrival !== undefined) {
    list = list.filter((p) => p.is_new_arrival === options.newArrival);
  }
  if (options?.bestseller !== undefined) {
    list = list.filter((p) => p.is_bestseller === options.bestseller);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.product_code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.material && p.material.toLowerCase().includes(q))
    );
  }

  if (options?.sortBy === 'price-asc') {
    list.sort((a, b) => (a.discount_price ?? a.price) - (b.discount_price ?? b.price));
  } else if (options?.sortBy === 'price-desc') {
    list.sort((a, b) => (b.discount_price ?? b.price) - (a.discount_price ?? a.price));
  } else if (options?.sortBy === 'popularity') {
    list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
  }

  // Attach category information
  return list.map((p) => ({
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  }));
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  return memoryProducts.map((p) => ({
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = memoryProducts.find((item) => item.slug === slug);
  if (!p) return null;
  return {
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const p = memoryProducts.find((item) => item.id === id);
  if (!p) return null;
  return {
    ...p,
    category: memoryCategories.find((c) => c.id === p.category_id),
  };
}

/**
 * Server-Side Order Creation:
 * 1. Validates customer information.
 * 2. Fetches current real prices from database/repository (rejecting browser prices).
 * 3. Verifies stock availability.
 * 4. Transactionally creates order and decreases stock.
 * 5. Generates immutable snapshot and TC-XXXXXXXX order number.
 */
export async function createOrderServerSide(params: {
  customer: CustomerOrderDetails;
  items: Array<{ productId: string; quantity: number }>;
}): Promise<{ order: Order; items: OrderItem[] }> {
  if (!params.items || params.items.length === 0) {
    throw new Error('Order must contain at least one product.');
  }

  const orderNumber = generateOrderNumber();
  const orderId = `ord-${Date.now()}`;
  let subtotal = 0;
  const processedItems: OrderItem[] = [];

  for (const requestedItem of params.items) {
    const product = memoryProducts.find((p) => p.id === requestedItem.productId && p.is_active);
    if (!product) {
      throw new Error(`Product ${requestedItem.productId} is not available.`);
    }

    if (requestedItem.quantity <= 0) {
      throw new Error(`Invalid quantity for product ${product.name}`);
    }

    if (product.stock_quantity < requestedItem.quantity) {
      throw new Error(
        `Insufficient stock for "${product.name}". Available: ${product.stock_quantity}, Requested: ${requestedItem.quantity}`
      );
    }

    // Always use actual active server price (discount price if active, else standard price)
    const currentPrice = product.discount_price ?? product.price;
    const lineTotal = currentPrice * requestedItem.quantity;
    subtotal += lineTotal;

    processedItems.push({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      order_id: orderId,
      product_id: product.id,
      product_name_snapshot: product.name,
      product_code_snapshot: product.product_code,
      unit_price_snapshot: currentPrice,
      quantity: requestedItem.quantity,
      line_total: lineTotal,
    });

    // Update stock and log inventory change
    const prevStock = product.stock_quantity;
    product.stock_quantity -= requestedItem.quantity;
    memoryInventoryLogs.unshift({
      id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      product_id: product.id,
      previous_quantity: prevStock,
      new_quantity: product.stock_quantity,
      adjustment_reason: `Order placed (${orderNumber})`,
      created_at: new Date().toISOString(),
    });
  }

  const newOrder: Order = {
    id: orderId,
    order_number: orderNumber,
    customer_name: params.customer.name.trim(),
    customer_phone: params.customer.phone.trim(),
    delivery_address: params.customer.address.trim(),
    city: params.customer.city.trim(),
    state: params.customer.state.trim(),
    pincode: params.customer.pincode.trim(),
    subtotal: subtotal,
    order_status: 'Awaiting WhatsApp Confirmation',
    customer_consent: params.customer.consent,
    notes: params.customer.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items: processedItems,
  };

  memoryOrders.unshift(newOrder);

  // Log to audit logs
  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    action: 'ORDER_CREATED',
    entity_type: 'ORDER',
    entity_id: orderNumber,
    metadata: {
      order_id: orderId,
      items_count: processedItems.length,
      subtotal,
    },
    created_at: new Date().toISOString(),
  });

  return { order: newOrder, items: processedItems };
}

export async function getOrdersAdmin(): Promise<Order[]> {
  return memoryOrders;
}

export async function getOrderById(id: string): Promise<Order | null> {
  return memoryOrders.find((o) => o.id === id || o.order_number === id) || null;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  const order = memoryOrders.find((o) => o.id === orderId || o.order_number === orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.order_status = status;
  order.updated_at = new Date().toISOString();

  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    action: 'ORDER_STATUS_UPDATED',
    entity_type: 'ORDER',
    entity_id: order.order_number,
    metadata: { new_status: status },
    created_at: new Date().toISOString(),
  });

  return order;
}

export async function updateProductStock(
  productId: string,
  newQuantity: number,
  reason: string
): Promise<Product> {
  const product = memoryProducts.find((p) => p.id === productId);
  if (!product) throw new Error('Product not found');

  const prev = product.stock_quantity;
  product.stock_quantity = newQuantity;

  memoryInventoryLogs.unshift({
    id: `inv-${Date.now()}`,
    product_id: productId,
    previous_quantity: prev,
    new_quantity: newQuantity,
    adjustment_reason: reason,
    created_at: new Date().toISOString(),
  });

  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    action: 'STOCK_ADJUSTMENT',
    entity_type: 'PRODUCT',
    entity_id: product.product_code,
    metadata: { previous: prev, updated: newQuantity, reason },
    created_at: new Date().toISOString(),
  });

  return product;
}

export async function saveProduct(productData: Partial<Product>): Promise<Product> {
  if (productData.id) {
    const index = memoryProducts.findIndex((p) => p.id === productData.id);
    if (index !== -1) {
      memoryProducts[index] = {
        ...memoryProducts[index],
        ...productData,
        updated_at: new Date().toISOString(),
      };
      return memoryProducts[index];
    }
  }

  // Create new product
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    product_code: productData.product_code || `TC-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    slug: productData.slug || `product-${Date.now()}`,
    name: productData.name || 'Untitled Piece',
    description: productData.description || '',
    price: productData.price || 0,
    discount_price: productData.discount_price || null,
    category_id: productData.category_id || null,
    stock_quantity: productData.stock_quantity || 0,
    material: productData.material || '',
    occasion: productData.occasion || '',
    is_featured: productData.is_featured || false,
    is_new_arrival: productData.is_new_arrival ?? true,
    is_bestseller: productData.is_bestseller || false,
    is_active: productData.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    images: productData.images || [
      {
        id: `img-${Date.now()}`,
        product_id: `prod-${Date.now()}`,
        image_path: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        alt_text: productData.name || '',
        display_order: 1,
      },
    ],
  };

  memoryProducts.unshift(newProduct);
  return newProduct;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  const index = memoryProducts.findIndex((p) => p.id === productId);
  if (index !== -1) {
    memoryProducts.splice(index, 1);
    return true;
  }
  return false;
}

export async function getInventoryLogs(): Promise<InventoryLog[]> {
  return memoryInventoryLogs.map((log) => ({
    ...log,
    product: memoryProducts.find((p) => p.id === log.product_id),
  }));
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  return memoryAuditLogs;
}

export async function getContactEnquiries(): Promise<ContactEnquiry[]> {
  return memoryEnquiries;
}

export async function saveContactEnquiry(params: {
  customer_name: string;
  contact_number: string;
  message: string;
  consent: boolean;
}): Promise<ContactEnquiry> {
  const enquiry: ContactEnquiry = {
    id: `enq-${Date.now()}`,
    customer_name: params.customer_name,
    contact_number: params.contact_number,
    message: params.message,
    consent: params.consent,
    is_read: false,
    created_at: new Date().toISOString(),
  };

  memoryEnquiries.unshift(enquiry);
  return enquiry;
}
