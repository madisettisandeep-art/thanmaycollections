import { NextRequest, NextResponse } from 'next/server';
import { updateCinemaScrollItem, deleteCinemaScrollItem } from '@/lib/data/store-repository';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const updated = await updateCinemaScrollItem(params.id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error updating cinema scroll item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteCinemaScrollItem(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting cinema scroll item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
