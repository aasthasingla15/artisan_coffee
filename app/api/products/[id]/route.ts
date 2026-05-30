import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/db';
import Coffee, { ICoffeeProduct } from '@/models/Coffee';
import { verifyAccessToken } from '@/utils/jwt';

function getAuthToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop() || '';
    await dbConnect();
    const product = await Coffee.findOne({ $or: [{ slug: productId }, { _id: productId }] }).lean();
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    const productDoc = product as unknown as ICoffeeProduct & { _id: Types.ObjectId };
    return NextResponse.json({ ...productDoc, id: productDoc._id.toString(), slug: productDoc.slug || productDoc._id.toString() }, { status: 200 });
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json({ error: 'Unable to fetch product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop() || '';
    const token = getAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifyAccessToken(token);
    if (!payload?.role || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    await dbConnect();
    const deleted = await Coffee.findOneAndDelete({ $or: [{ slug: productId }, { _id: productId }] });
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Unable to delete product' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split('/').pop() || '';
    const token = getAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const payload = verifyAccessToken(token);
    if (!payload?.role || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    await dbConnect();
    const updated = await Coffee.findOneAndUpdate(
      { $or: [{ slug: productId }, { _id: productId }] },
      { $set: body },
      { new: true }
    )
      .lean();

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedDoc = updated as unknown as ICoffeeProduct & { _id: Types.ObjectId };
    return NextResponse.json({ ...updatedDoc, id: updatedDoc._id.toString(), slug: updatedDoc.slug || updatedDoc._id.toString() }, { status: 200 });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Unable to update product' }, { status: 500 });
  }
}
