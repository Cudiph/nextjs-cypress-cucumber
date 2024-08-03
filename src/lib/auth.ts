import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

// error message from the backend
export interface ErrorMessage {
  message: string;
}

export interface JwtAuthPayload {
  username: string;
  iat: number; // in seconds
}

export function checkLoggedIn() {
  const signed = cookies().get('auth')?.value
  if (!signed) return false;
  const SECRET = process.env.SECRET;
  if (!SECRET) throw new Error('Secret not configured.');

  try {
    const test = jwt.verify(signed, SECRET) as JwtAuthPayload;
    return test;
  } catch (_) {
    return false;
  }
}
