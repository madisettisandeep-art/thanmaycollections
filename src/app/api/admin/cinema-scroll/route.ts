import { NextRequest, NextResponse } from 'next/server';
import { getCinemaScrollItems, createCinemaScrollItem } from '@/lib/data/store-repository';

export async function GET() {
  const items = await getCinemaScrollItems(false);
  return NextResponse.json({ success: true, items });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.title || !data.image_url) {
      return NextResponse.json({ error: 'Title and Image URL are required' }, { status: 400 });
    }
    const item = await createCinemaScrollItem(data);
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error('Error creating cinema scroll item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
