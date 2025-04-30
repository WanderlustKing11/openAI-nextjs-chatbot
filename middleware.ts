
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID = [
    process.env.CR7_CODE,
    process.env.MESSI_CODE,
    process.env.LBJ_CODE,
].filter((c): c is string => Boolean(c));

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const cookie = req.cookies.get('chat_access')?.value;

    // Let login & verify & static assets through
    if (
        url.pathname === '/login' ||
        url.pathname.startsWith('/api/verify') ||
        url.pathname.startsWith('/_next/')
    ) {
        return NextResponse.next()
    }

    // If no cookie OR not in VALID list -> redirect to /login
    if (!cookie || !VALID.includes(cookie)) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Otherwise let them through (including /api/chat)
    return NextResponse.next()
}

// apply to pages and API
export const config = {
    matcher: ['/', '/api/chat'],
}
