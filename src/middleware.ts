import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAdminRoute = request.nextUrl.pathname.startsWith('/complaint-list');
    const isLoginPage = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isLoginPage) {
        const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true';

        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/complaint-list'],
};
