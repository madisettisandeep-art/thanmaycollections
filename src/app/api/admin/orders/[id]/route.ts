import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/data/store-repository';
import { OrderStatus } from '@/types';
import { cookies } from 'next/headers';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const token = cookieStore.get('thanmay_admin_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status } = body as { status: OrderStatus };

    const validStatuses: OrderStatus[] = [
      'Pending',
      'Awaiting WhatsApp Confirmation',
      'Confirmed',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid order status specified' },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(params.id, status);

    return NextResponse.json({ success: true, order: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error updating order';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
