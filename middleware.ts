
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_CODES = [
    process.env.CR7_CODE!,
    process.env.MESSI_CODE!,
    process.env.LBJ_CODE!,
];

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const cookie = req.cookies.get('chat_access')?.value;

    if (
        (url.pathname === '/chat' || url.pathname.startsWith('/api/chat')) &&
        !VALID_CODES.includes(cookie!)
    ) {
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/chat', '/api/chat'],
}