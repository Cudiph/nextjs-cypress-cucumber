import { checkLoggedIn, JwtAuthPayload } from '@/lib/auth';
import type { Metadata } from "next";
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
  title: "Profile",
  description: "Bring the swag to your profile.",
};

export const fetchCache = 'force-no-store';

export default function Home() {
  const auth = checkLoggedIn();
  if (!auth) {
    return redirect('/login?reason=unauthorized');
  }

  return (
    <main>
      <p>Logged in as <b>{auth.username}</b></p>
      <a href="/api/logout">Log out</a>
    </main>
  );
}
