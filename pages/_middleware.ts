import { NextResponse, NextFetchEvent } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const res = NextResponse.next();

  console.log("exampleMiddleware: req.url:", req.url);

  return res;
}
