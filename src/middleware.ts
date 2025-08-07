import { auth } from "@/auth";

export default auth((req) => {
  const reqUrl = req.nextUrl;
  if (!req.auth) {
    console.log("Unauthorized access attempt to:", reqUrl.pathname);
    return Response.redirect(new URL("api/auth/signin", reqUrl));
  }
});

export const config = {
  matcher: ["/panel/:path*"],
};
