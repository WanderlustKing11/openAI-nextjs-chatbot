
// middleware.ts (in your project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone()
    const hasAccess = req.cookies.get('chat_access') === process.env.CHAT_API_KEY

    // Always allow the verify route & static assets
    if (
        url.pathname === '/login' ||
        url.pathname.startsWith('/api/verify') ||
        url.pathname.startsWith('/_next/')
    ) {
        return NextResponse.next()
    }

    // If no access cookie, send to /login
    if (!hasAccess) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Otherwise let them through (including /api/chat)
    return NextResponse.next()
}

// apply to pages and your API
export const config = {
    matcher: ['/', '/api/chat'],
}
