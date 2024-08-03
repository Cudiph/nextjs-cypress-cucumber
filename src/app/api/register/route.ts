import { NextRequest, NextResponse } from "next/server";
import { getDB, CredentialSchema } from "@/lib/db";
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const db = getDB();
  const dbResult = db.prepare('SELECT * FROM credential WHERE username = ?').get(username) as CredentialSchema | undefined;

  if (dbResult) {
    return NextResponse.json({ message: 'username already exist.' }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  try {
    const info = db.prepare(`INSERT INTO credential VALUES (?, ?)`).run(username, hashed);
    return NextResponse.json({}, { status: 201 });
  } catch (_) {
    return NextResponse.json({ message: 'Database error.' }, { status: 500 })
  }
}
