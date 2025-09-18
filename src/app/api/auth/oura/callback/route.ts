import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    // Handle OAuth error
    return NextResponse.redirect(new URL('/devices?error=oauth_failed', request.url))
  }

  if (code) {
    // In a real implementation, you would:
    // 1. Exchange the code for access/refresh tokens
    // 2. Store the tokens securely in the database
    // 3. Fetch initial user data from Oura API
    
    // Mock success for now
    console.log('Oura OAuth code received:', code)
    
    return NextResponse.redirect(new URL('/devices?success=oura_connected', request.url))
  }

  return NextResponse.redirect(new URL('/devices?error=no_code', request.url))
}