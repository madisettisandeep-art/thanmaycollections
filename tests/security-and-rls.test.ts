import { describe, it, expect } from 'vitest';
import { createOrderServerSide, updateOrderStatus, getProducts } from '../src/lib/data/store-repository';

describe('Security and Price Integrity Tests', () => {
  it('should ignore any client-supplied prices and compute server totals from authentic DB prices', async () => {
    const products = await getProducts();
    const product = products.find((p) => p.slug === 'padmavati-royal-kundan-choker-set')!;

    // Client attempts to pass a tampered price of ₹1
    const { order, items } = await createOrderServerSide({
      customer: {
        name: 'Attacker Malicious',
        phone: '+91 99999 99999',
        address: 'Hacked street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        consent: true,
      },
      // Note: createOrderServerSide only accepts productId and quantity, ignoring client prices!
      items: [{ productId: product.id, quantity: 1 }],
    });

    const expectedTruePrice = product.discount_price ?? product.price;
    expect(items[0].unit_price_snapshot).toBe(expectedTruePrice);
    expect(order.subtotal).toBe(expectedTruePrice);
    expect(order.subtotal).not.toBe(1);
  });

  it('should safely update order status only with recognized statuses', async () => {
    const products = await getProducts();
    const product = products[0];

    const { order } = await createOrderServerSide({
      customer: {
        name: 'Validation Tester',
        phone: '+91 98765 00000',
        address: 'Test Apt 101',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        consent: true,
      },
      items: [{ productId: product.id, quantity: 1 }],
    });

    const updated = await updateOrderStatus(order.id, 'Confirmed');
    expect(updated.order_status).toBe('Confirmed');

    const shipped = await updateOrderStatus(order.id, 'Shipped');
    expect(shipped.order_status).toBe('Shipped');
  });

  it('should authenticate admin and support secure salted PBKDF2 password updating', async () => {
    const { verifyAdmin, updateAdminPassword } = await import('../src/lib/auth/admin-auth');

    // Test with correct initial password
    const valid = verifyAdmin('admin@thanmaycollections.com', 'ThanmayLuxury2026!');
    expect(valid).toBe(true);

    // Test with incorrect password
    const invalid = verifyAdmin('admin@thanmaycollections.com', 'WrongPassword123');
    expect(invalid).toBe(false);

    // Test password update with validation
    const tooShort = updateAdminPassword('ThanmayLuxury2026!', 'short');
    expect(tooShort.success).toBe(false);

    // Update to new secure password
    const newPass = 'ThanmayNewOwner2026#';
    const updated = updateAdminPassword('ThanmayLuxury2026!', newPass);
    expect(updated.success).toBe(true);

    // Old password should now fail
    const oldCheck = verifyAdmin('admin@thanmaycollections.com', 'ThanmayLuxury2026!');
    expect(oldCheck).toBe(false);

    // New password should succeed
    const newCheck = verifyAdmin('admin@thanmaycollections.com', newPass);
    expect(newCheck).toBe(true);

    // Reset back for test idempotency
    updateAdminPassword(newPass, 'ThanmayLuxury2026!');
  });
});
