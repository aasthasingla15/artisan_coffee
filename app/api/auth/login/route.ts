import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyPassword } from '@/utils/auth';
import { signAccessToken, signRefreshToken } from '@/utils/jwt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const passwordIsValid = await verifyPassword(password, user.password);
    if (!passwordIsValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const accessToken = signAccessToken(user._id.toString(), user.email, user.role);
    const refreshToken = signRefreshToken(user._id.toString());

    user.refreshTokens = [...new Set([...(user.refreshTokens || []), refreshToken])];
    await user.save();

    const response = NextResponse.json({
      message: 'Login successful',
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

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
