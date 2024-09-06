import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

console.log("Middleware file loaded");

export default NextAuth(authConfig).auth;

export const config = {
  // middleware to run on all routes except api, _next/static, _next/image, and .png files
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
