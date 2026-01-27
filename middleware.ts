import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth; 

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  
    const privateRoutes = ["/perfil", "/configuracoes", "/carrinho"];
    const isPrivateRoute = privateRoutes.some(route => nextUrl.pathname.startsWith(route));;

    const isAuthRoute = ["/login", "/cadastro"].includes(nextUrl.pathname);

    if (isApiAuthRoute) return NextResponse.next();

    if (isAuthRoute) {
        if (isLoggedIn) {
        return NextResponse.redirect(new URL("/", nextUrl));
        }
        return NextResponse.next();
    }

  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}