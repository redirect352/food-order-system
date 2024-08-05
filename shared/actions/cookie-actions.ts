'use server';

import { cookies } from 'next/headers';
import { CryptoService } from '../services/CryptoService';

export async function handleLogin(token : string) {
  const data = CryptoService.encryptObject(token);
  cookies().set('token', data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14, // One week
    path: '/',
  });
  return { statusCode: 200 };
}
export async function getToken() {
  const tokenEnc = cookies().get('token')?.value;
  if (!tokenEnc) {
    return { token: null };
  }
  const result = CryptoService.decryptObject(tokenEnc);
  return { token: result };
}
export async function handleLogout() {
  cookies().delete('token');
  return { statusCode: 200 };
}
