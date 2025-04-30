
import { NextResponse } from 'next/server'


const VALID_CODES = [
    process.env.CR7_CODE,
    process.env.MESSI_CODE,
    process.env.LBJ_CODE,
    process.env.TB_CODE,
    process.env.SHOHEI_CODE,
    process.env.JUDGE_CODE,
    process.env.MBAPPE_CODE,
    process.env.CURRY_CODE,
    process.env.GOKU_CODE,
    process.env.YODA_CODE,
].filter((c): c is string => Boolean(c))

export async function POST(req: Request) {
    const { key } = await req.json()

    if (!VALID_CODES.includes(key)) {
        return new Response('Forbidden', { status: 403 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('chat_access', key, { path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
}
