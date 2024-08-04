"use client"

import Link from 'next/link'
import './page.css'

export default function Home() {
  return (
    <main>
      <Link href="/profile">Profile</Link>
      <Link href="/login">Log In</Link>
      <Link href="/register">Sign Up</Link>
    </main>
  );
}
