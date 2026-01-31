import { NextRequest, NextResponse } from 'next/server';

export function cartMiddleware(request: NextRequest, response: NextResponse) {
  const cartId = request.cookies.get('vitoria-cart-id')?.value;
  if (!cartId) {

    const newCartId = crypto.randomUUID();
    response.cookies.set('vitoria-cart-id', newCartId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  return response;
}