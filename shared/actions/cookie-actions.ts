"use server";

import { cookies } from 'next/headers';
import { CryptoService } from '../services/CryptoService';
import {sealData, unsealData} from 'iron-session';

export async function handleLogin(token : string, role?: string) {
  const tokenData = await CryptoService.encryptObject(token);
  const roleData = await CryptoService.encryptObject(role)
  const cookieStore = await cookies();
  cookieStore.set('token', tokenData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14, // One week
    path: '/',
  });
  cookieStore.set('role', roleData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 14, // One week
    path: '/',
  });
  return { statusCode: 200 };
}
export async function getToken() {
  const cookieStore = await cookies();
  const tokenEnc = cookieStore.get('token')?.value;
  if (!tokenEnc) {
    return { token: null };
  }
  const result:string = await CryptoService.decryptObject(tokenEnc);
  return { token: result };
}
export async function getRole() {
  const cookieStore = await cookies();
  const roleEnc = (cookieStore.get('role'))?.value;
  if (!roleEnc) {
    return { role: null };
  }
  const role:string = await CryptoService.decryptObject(roleEnc);
  return { role };
}
export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('role');
  return { statusCode: 200 };
}
