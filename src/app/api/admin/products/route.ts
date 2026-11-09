import { NextRequest, NextResponse } from 'next/server';
import { saveProduct } from '@/lib/data/store-repository';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('thanmay_admin_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const product = await saveProduct(body);
    return NextResponse.json({ success: true, product });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error creating product';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
