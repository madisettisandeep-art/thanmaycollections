import { NextRequest, NextResponse } from 'next/server';
import { getHeroBanners, createHeroBanner } from '@/lib/data/store-repository';

export async function GET() {
  const banners = await getHeroBanners(false);
  return NextResponse.json({ success: true, banners });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.title || !data.image_url) {
      return NextResponse.json({ error: 'Title and Image URL are required' }, { status: 400 });
    }
    const banner = await createHeroBanner(data);
    return NextResponse.json({ success: true, banner }, { status: 201 });
  } catch (error) {
    console.error('Error creating hero banner:', error);
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}
