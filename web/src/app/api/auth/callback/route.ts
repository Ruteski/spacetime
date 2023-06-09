import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookiesExpiresInSeconds = 60 * 60 * 24 * 30 // 60 segundos - 60 minutos - 24 horas - 30 dias

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookiesExpiresInSeconds}`,
    },
  })
}
