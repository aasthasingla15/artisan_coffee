import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/db';
import User, { IUser } from '@/models/User';
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

    const user = await User.findById(payload.sub).select('-password -refreshTokens').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userDoc = user as unknown as IUser & { _id: Types.ObjectId };
    return NextResponse.json({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role,
      favorites: userDoc.favorites,
      wishlist: userDoc.wishlist || [],
      addresses: userDoc.addresses || []
    }, { status: 200 });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Unable to fetch profile' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = getAuthToken(req);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    const body = await req.json();
    await dbConnect();

    const updated = await User.findByIdAndUpdate(
      payload.sub,
      {
        $set: {
          name: body.name,
          email: body.email,
          favorites: body.favorites,
          wishlist: body.wishlist,
          addresses: body.addresses
        }
      },
      { new: true, runValidators: true }
    ).select('-password -refreshTokens').lean();

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedDoc = updated as unknown as IUser & { _id: Types.ObjectId };
    return NextResponse.json({
      id: updatedDoc._id.toString(),
      name: updatedDoc.name,
      email: updatedDoc.email,
      role: updatedDoc.role,
      favorites: updatedDoc.favorites,
      wishlist: updatedDoc.wishlist || [],
      addresses: updatedDoc.addresses || []
    }, { status: 200 });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Unable to update profile' }, { status: 500 });
  }
}
