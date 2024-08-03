import { NextRequest, NextResponse } from "next/server";
import { getDB, CredentialSchema } from "@/lib/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const db = getDB();
  const SECRET = process.env.SECRET
  if (!SECRET) {
    throw new Error("Secret not configured.");
  }

  const userCred = db.prepare('SELECT * FROM credential WHERE username = ?').get(username) as CredentialSchema | undefined;
  if (!userCred) { return NextResponse.json({ message: "User doesn't exist." }, { status: 401 }) }

  const isEqual = await bcrypt.compare(password, userCred.hashed_password);
  if (!isEqual) {
    return NextResponse.json({ message: "Wrong password." }, { status: 401 })
  }

  const res = NextResponse.json({});
  const signed = jwt.sign({ username, iat: Math.floor(Date.now() / 1000) - 30 }, SECRET);
  res.cookies.set("auth", signed, { httpOnly: true, sameSite: 'strict', secure: true });

  return res;
}
