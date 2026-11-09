import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/lib/data/store-repository';
import { z } from 'zod';

const TrackSchema = z.object({
  orderNumber: z.string().trim().min(5),
  phone: z.string().trim().min(5),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, phone } = TrackSchema.parse(body);

    const order = await getOrderById(orderNumber.trim().toUpperCase());
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order reference not found. Please check your order ID.' },
        { status: 404 }
      );
    }

    // Verify phone matches (last 4 digits or full string)
    const cleanOrderPhone = order.customer_phone.replace(/[^\d]/g, '');
    const cleanInputPhone = phone.replace(/[^\d]/g, '');

    if (
      !cleanOrderPhone.includes(cleanInputPhone) &&
      !cleanInputPhone.includes(cleanOrderPhone.slice(-4))
    ) {
      return NextResponse.json(
        { success: false, message: 'Phone number does not match order record.' },
        { status: 401 }
      );
    }

    // Return sanitized status details without exposing internal customer IDs
    return NextResponse.json({
      success: true,
      order: {
        order_number: order.order_number,
        customer_name: order.customer_name,
        city: order.city,
        state: order.state,
        order_status: order.order_status,
        subtotal: order.subtotal,
        created_at: order.created_at,
        updated_at: order.updated_at,
        items_count: order.items?.length || 1,
      },
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Error checking order' }, { status: 500 });
  }
}
