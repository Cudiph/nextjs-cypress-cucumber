import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import { checkLoggedIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

const AuthForm = dynamic(() => import('@/components/AuthForm'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Registration",
  description: "Register yourself to the authenticator app",
};

export default function Register() {
  const auth = checkLoggedIn();
  if (auth) {
    redirect('/profile');
  }

  return (
    <main>
      <AuthForm isLogin={false} />
    </main>
  )
}
