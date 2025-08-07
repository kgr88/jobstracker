import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  if (pathname === '/dashboard' && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

   if (pathname === '/applications' && !authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((pathname === '/login' || pathname === '/register') && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/login', '/register', '/applications'],
};
