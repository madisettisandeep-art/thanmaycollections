import { NextRequest, NextResponse } from 'next/server';
import { updateHeroBanner, deleteHeroBanner } from '@/lib/data/store-repository';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await updateHeroBanner(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, banner: updated });
  } catch (error) {
    console.error('Error updating hero banner:', error);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteHeroBanner(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero banner:', error);
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
