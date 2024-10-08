import { authOptions } from "@/libs/auth"; 
import nextAuth from "next-auth";
import NextAuth from "next-auth/next";

/* eslint-disable @typescript-eslint/no-unused-vars */
const handler = NextAuth(authOptions);
/* eslint-enable @typescript-eslint/no-unused-vars */

export { handler as GET, handler as POST };
