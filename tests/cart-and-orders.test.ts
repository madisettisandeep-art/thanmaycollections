import { describe, it, expect } from 'vitest';
import { createOrderServerSide, getProducts, getCategories } from '../src/lib/data/store-repository';
import { generateOrderNumber, formatPrice } from '../src/lib/utils/formatters';
import { buildWhatsAppOrderMessage } from '../src/lib/utils/whatsapp';

describe('Cart, Catalogue and Order System Tests', () => {
  it('should load initial categories with correct slug structure', async () => {
    const categories = await getCategories();
    expect(categories.length).toBeGreaterThan(0);
    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain('necklace-sets');
    expect(slugs).toContain('bridal-jewellery');
    expect(slugs).toContain('kundan-jewellery');
  });

  it('should filter products by category and flags accurately', async () => {
    const all = await getProducts();
    expect(all.length).toBeGreaterThan(0);

    const featured = await getProducts({ featured: true });
    expect(featured.every((p) => p.is_featured)).toBe(true);

    const newArrivals = await getProducts({ newArrival: true });
    expect(newArrivals.every((p) => p.is_new_arrival)).toBe(true);
  });

  it('should generate valid TC-XXXXXXXX order numbers', () => {
    const orderNum = generateOrderNumber();
    expect(orderNum).toMatch(/^TC-[0-9A-Z]{8}$/);
  });

  it('should format INR currency properly', () => {
    const formatted = formatPrice(3999);
    expect(formatted).toContain('3,999');
  });

  it('should process order on the server, calculate real price, and decrement stock', async () => {
    const products = await getProducts();
    const targetProduct = products[0];
    const initialStock = targetProduct.stock_quantity;

    const customerDetails = {
      name: 'Rukmini Devi',
      phone: '+91 98450 12345',
      address: 'Plot 42, Temple Road',
      city: 'Mysuru',
      state: 'Karnataka',
      pincode: '570001',
      consent: true,
    };

    const { order, items } = await createOrderServerSide({
      customer: customerDetails,
      items: [{ productId: targetProduct.id, quantity: 2 }],
    });

    expect(order.order_number).toMatch(/^TC-/);
    expect(order.customer_name).toBe('Rukmini Devi');
    expect(order.order_status).toBe('Awaiting WhatsApp Confirmation');
    expect(items.length).toBe(1);

    const activeUnitPrice = targetProduct.discount_price ?? targetProduct.price;
    expect(items[0].unit_price_snapshot).toBe(activeUnitPrice);
    expect(items[0].line_total).toBe(activeUnitPrice * 2);
    expect(order.subtotal).toBe(activeUnitPrice * 2);

    // Verify stock was decremented safely in repository
    const updated = await getProducts();
    const updatedTarget = updated.find((p) => p.id === targetProduct.id)!;
    expect(updatedTarget.stock_quantity).toBe(initialStock - 2);
  });

  it('should reject order if requested quantity exceeds available stock', async () => {
    const products = await getProducts();
    const product = products[0];

    const customerDetails = {
      name: 'Test Customer',
      phone: '+91 98765 43210',
      address: 'Test Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      consent: true,
    };

    await expect(
      createOrderServerSide({
        customer: customerDetails,
        items: [{ productId: product.id, quantity: 999999 }],
      })
    ).rejects.toThrow(/Insufficient stock/);
  });

  it('should construct properly formatted WhatsApp order text', () => {
    const msg = buildWhatsAppOrderMessage({
      orderNumber: 'TC-TEST1234',
      customer: {
        name: 'Sunita Rao',
        phone: '+91 98765 43210',
        address: 'Villa 10',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500034',
        consent: true,
      },
      items: [
        {
          product_id: 'p-1',
          product_name_snapshot: 'Padmavati Royal Kundan Choker Set',
          product_code_snapshot: 'TC-NK-001',
          unit_price_snapshot: 3999,
          quantity: 1,
          line_total: 3999,
        },
      ],
      subtotal: 3999,
    });

    expect(msg).toContain('Hello Thanmay Collections!');
    expect(msg).toContain('Order ID: TC-TEST1234');
    expect(msg).toContain('Customer Name: Sunita Rao');
    expect(msg).toContain('Padmavati Royal Kundan Choker Set');
    expect(msg).toContain('Product ID: TC-NK-001');
    expect(msg).toContain('Total Order Value:');
    expect(msg).toContain('Please confirm product availability');
  });
});
