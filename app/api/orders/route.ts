import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { verifyAccessToken } from '@/utils/jwt';

function getAuthToken(req: Request) {
  const authHeader = req.headers.get('authorization');
  return authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
}

export async function GET(req: Request) {
  try {
    const token = getAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    await dbConnect();

    if (payload.role === 'admin') {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NextResponse.json(orders.map((order: any) => ({ ...order, id: order._id.toString() })), { status: 200 });
    }

    const orders = await Order.find({ userId: payload.sub }).sort({ createdAt: -1 }).lean();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json(orders.map((order: any) => ({ ...order, id: order._id.toString() })), { status: 200 });
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json({ error: 'Unable to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, totalAmount, shippingAddress, email } = body;

    if (!Array.isArray(items) || items.length === 0 || !totalAmount || !shippingAddress || !email) {
      return NextResponse.json({ error: 'Missing order details' }, { status: 400 });
    }

    const token = getAuthToken(req);
    let userId: string | undefined;
    if (token) {
      try {
        const payload = verifyAccessToken(token);
        userId = payload.sub;
      } catch {
        // continue as guest checkout if token invalid
      }
    }

    await dbConnect();
    const order = await Order.create({
      userId,
      email,
      items,
      totalAmount,
      shippingAddress,
      status: 'received'
    });

    return NextResponse.json({ message: 'Order placed successfully', orderId: order._id.toString() }, { status: 201 });
  } catch (error) {
    console.error('Place order error:', error);
    return NextResponse.json({ error: 'Unable to place order' }, { status: 500 });
  }
}
