import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.JWT_SECRET || 'artisan_access_secret';
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'artisan_refresh_secret';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export function signAccessToken(userId: string, email: string, role: string) {
  return jwt.sign({ sub: userId, email, role }, accessTokenSecret, {
    expiresIn: '15m'
  });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId }, refreshTokenSecret, {
    expiresIn: '7d'
  });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessTokenSecret) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshTokenSecret) as RefreshTokenPayload;
}
