import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/jwt';

export async function GET(req: NextRequest) {
  try {
    const refreshCookie = req.cookies.get('refreshToken')?.value;
    if (!refreshCookie) {
      return NextResponse.json({ error: 'Refresh token missing' }, { status: 401 });
    }

    const payload = verifyRefreshToken(refreshCookie);
    if (!payload?.sub) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(payload.sub);

    if (!user || !user.refreshTokens?.includes(refreshCookie)) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    const accessToken = signAccessToken(user._id.toString(), user.email, user.role);
    const nextRefreshToken = signRefreshToken(user._id.toString());

    user.refreshTokens = user.refreshTokens.filter((token: string) => token !== refreshCookie);
    user.refreshTokens.push(nextRefreshToken);
    await user.save();

    const response = NextResponse.json({
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        favorites: user.favorites,
        wishlist: user.wishlist || [],
        addresses: user.addresses || []
      }
    }, { status: 200 });

    response.cookies.set('refreshToken', nextRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}
