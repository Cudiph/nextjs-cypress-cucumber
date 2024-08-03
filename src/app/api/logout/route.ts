import { NextRequest, NextResponse } from "next/server";

// 
export async function GET(request: NextRequest) {
  return POST(request);
}

export async function POST(request: NextRequest) {
  const landingPageURL = new URL('/', request.url)
  const res = NextResponse.redirect(landingPageURL);
  res.cookies.delete('auth');
  return res;
}
