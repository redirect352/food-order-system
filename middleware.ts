import type { NextRequest } from 'next/server';

export const protectedRoutes = [
  '/menu', '/prepackMenu', '/cart', '/active-orders',
];
export const authRoutes = ['/login'];
export const publicRoutes = ['/'];

export const config = {
  matcher: ['/menu', '/prepackMenu', '/cart', '/active-orders', '/login'],
};

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value;
  if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/menu', request.url));
  }
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url));
  }
}
