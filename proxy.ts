import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { cartMiddleware } from "./middlewares/cart";

export default  auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; 

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  
    const privateRoutes = ["/perfil", "/configuracoes"];
    const isPrivateRoute = privateRoutes.some(route => nextUrl.pathname.startsWith(route));;

    const isAuthRoute = ["/login", "/cadastro"].includes(nextUrl.pathname);

    let response = NextResponse.next();

    if (isApiAuthRoute) return response;
    
    if (isAuthRoute) {
        if (isLoggedIn) {
        response = NextResponse.redirect(new URL("/", nextUrl));
        }
    }

  if (isPrivateRoute && !isLoggedIn) {
    response = NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (!isLoggedIn) {
    response = cartMiddleware(req, response);
  } else {
    const cartIdFromCookie = req.cookies.get('vitoria-cart-id')?.value;
    if(cartIdFromCookie) {
      response.cookies.delete('vitoria-cart-id')

    }
  }
  

  return response;
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}