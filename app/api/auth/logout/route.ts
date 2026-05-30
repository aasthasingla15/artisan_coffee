import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyRefreshToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
  try {
    const refreshCookie = req.cookies.get('refreshToken')?.value;
    if (refreshCookie) {
      const payload = verifyRefreshToken(refreshCookie);
      if (payload?.sub) {
        await dbConnect();
        const user = await User.findById(payload.sub);
        if (user) {
          user.refreshTokens = (user.refreshTokens || []).filter((token: string) => token !== refreshCookie);
          await user.save();
        }
      }
    }

    const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
