import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { CryptoService } from './shared/services/CryptoService';

export const protectedRoutes = [
  '/menu', '/prepackMenu', '/cart', '/active-orders',
];
export const authRoutes = ['/login', '/change-password', '/reset-password', '/password-confirmation', '/email-confirmation', '/sign-up'];
export const publicRoutes = ['/'];

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// eslint-disable-next-line consistent-return
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathName = request.nextUrl.pathname;
  if (token) {
    const payload = await decodeJwt(await CryptoService.decryptObject(token));
    const { role } = payload;
    if (!role) {
      request.cookies.delete(['role', 'token']);
      return Response.redirect(new URL('/login', request.url));
    }
    if (!pathName.startsWith(`/${(role as string).replaceAll('_', '-')}`) && !publicRoutes.includes(pathName)) {
      return Response.redirect(new URL('/', request.url));
    }
  } else if (
    !publicRoutes.includes(pathName) &&
    !authRoutes.find(route => pathName.startsWith(route))
  ) {
    return Response.redirect(new URL('/login', request.url));
  }
}
