'use server';

import { cookies } from 'next/headers';
import { CryptoService } from '../services/CryptoService';

export async function handleLogin(token : string, role?: string) {
  const tokenData = CryptoService.encryptObject(token);
  const roleData = CryptoService.encryptObject(role);
  (await cookies()).set('token', tokenData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14, // One week
    path: '/',
  });
  (await cookies()).set('role', roleData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14, // One week
    path: '/',
  });
  return { statusCode: 200 };
}
export async function getToken() {
  const tokenEnc = (await cookies()).get('token')?.value;
  if (!tokenEnc) {
    return { token: null };
  }
  const result:string = CryptoService.decryptObject(tokenEnc);
  return { token: result };
}
export async function getRole() {
  const roleEnc = ((await cookies()).get('role'))?.value;
  if (!roleEnc) {
    return { role: null };
  }
  const role:string = CryptoService.decryptObject(roleEnc);
  return { role };
}
export async function handleLogout() {
  (await cookies()).delete('token');
  (await cookies()).delete('role');
  return { statusCode: 200 };
}
