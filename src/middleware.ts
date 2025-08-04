import { auth } from "@/auth";

export default auth((req) => {
  console.log("Middleware running for:", req.nextUrl.pathname);
  if (!req.auth) {
    return Response.redirect("/auth/signin");
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/panel"],
};
