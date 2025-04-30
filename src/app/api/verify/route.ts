
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { key } = await req.json()
    const valid = [
        process.env.CR7_CODE,
        process.env.MESSI_CODE,
        process.env.LBJ_CODE
    ];

    if (valid.includes(key)) {
        const res = NextResponse.json({ ok: true })
        // set a cookie valid for e.g. 7 days
        res.cookies.set('chat_access', key, { path: '/', maxAge: 60 * 60 * 24 * 7 })
        return res
    };

    return new Response('Forbidden', { status: 403 });
}
