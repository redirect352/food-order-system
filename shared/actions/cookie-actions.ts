"use server";

import { cookies } from 'next/headers';
import { CryptoService } from '../services/CryptoService';

const refreshTokenExpireIn = +(process.env.REFRESH_TOKEN_EXPIRE_IN ?? 2 * 60 * 60 * 24 * 14);
const accessTokenExpireIn = +(process.env.ACCESS_TOKEN_EXPIRE_IN ?? 50*60);

export async function handleLogin(token : string, refreshToken: string, role?: string) {
  const tokenData = await CryptoService.encryptObject(token);
  const refreshTokenData = await CryptoService.encryptObject(refreshToken);
  const roleData = await CryptoService.encryptObject(role)
  const cookieStore = await cookies();
  cookieStore.set('token', tokenData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: accessTokenExpireIn, // 55mins
    path: '/',
  });
  cookieStore.set('role', roleData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: refreshTokenExpireIn, // One week
    path: '/',
  });
  cookieStore.set('refresh-token', refreshTokenData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: refreshTokenExpireIn, // Two weeks
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

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const tokenEnc = cookieStore.get('refresh-token')?.value;
  if (!tokenEnc) {
    return null;
  }
  const result:string = await CryptoService.decryptObject(tokenEnc);
  return result;
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
  const refreshToken = await getRefreshToken();
  if(refreshToken){
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
  }
  cookieStore.delete('token');
  cookieStore.delete('role');
  cookieStore.delete('refresh-token');  
  return { statusCode: 200 };
}

export async function handleRefresh(){
  const refreshToken = await getRefreshToken();
  if(!refreshToken) return undefined;
  const res = await fetch( `${process.env.NEXT_PUBLIC_API_BASE}/auth/refresh`,
    {
      method:'POST', 
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    }
  );
  if(res.ok){
    const data = await res.json();
    if(data.access_token){
    const cookieStore = await cookies();
    const tokenData = await CryptoService.encryptObject(data.access_token);
      cookieStore.set('token', tokenData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: accessTokenExpireIn, // 55mins
        path: '/',
      });
    }
    return data.access_token as string;
  }
  return undefined;
}