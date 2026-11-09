import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createOrderServerSide } from '@/lib/data/store-repository';
import { generateWhatsAppOrderUrl } from '@/lib/utils/whatsapp';

const OrderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be greater than zero'),
});

const CreateOrderSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(2, 'Full name is required (min 2 characters)'),
    phone: z.string().trim().min(10, 'Valid phone number is required'),
    address: z.string().trim().min(5, 'Complete delivery address is required'),
    city: z.string().trim().min(2, 'City is required'),
    state: z.string().trim().min(2, 'State is required'),
    pincode: z.string().trim().min(4, 'Valid PIN code is required'),
    notes: z.string().optional().nullable(),
    consent: z.literal(true, {
      errorMap: () => ({ message: 'Consent to process delivery is required' }),
    }),
  }),
  items: z.array(OrderItemSchema).min(1, 'Order must contain at least one piece'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = CreateOrderSchema.parse(body);

    // Call server-side repository which recalculates true database prices
    // and checks real-time inventory levels
    const { order, items } = await createOrderServerSide({
      customer: validatedData.customer,
      items: validatedData.items,
    });

    // Build the official WhatsApp Click-to-Chat URL
    const whatsappUrl = generateWhatsAppOrderUrl({
      orderNumber: order.order_number,
      customer: validatedData.customer,
      items: items,
      subtotal: order.subtotal,
      businessNumber: process.env.WHATSAPP_BUSINESS_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER,
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        order_number: order.order_number,
        subtotal: order.subtotal,
        order_status: order.order_status,
      },
      whatsappUrl,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.errors[0]?.message || 'Invalid input data',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
