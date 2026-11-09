import { NextRequest, NextResponse } from 'next/server';
import { updateProductStock } from '@/lib/data/store-repository';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('thanmay_admin_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId, newQuantity, reason } = await req.json();

    if (!productId || typeof newQuantity !== 'number' || newQuantity < 0) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const updated = await updateProductStock(
      productId,
      newQuantity,
      reason || 'Administrative manual adjustment'
    );

    return NextResponse.json({ success: true, product: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error updating inventory';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
