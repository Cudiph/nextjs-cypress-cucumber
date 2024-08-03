import dynamic from 'next/dynamic';
import type { Metadata } from "next";
import { checkLoggedIn } from '@/lib/auth';
import { redirect } from 'next/navigation';

const AuthForm = dynamic(() => import('@/components/AuthForm'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Login",
  description: "Login page for loyal authenticator user",
};

export default function Login() {
  const auth = checkLoggedIn();
  if (auth) {
    redirect('/profile');
  }
  
  return (
    <main>
      <AuthForm isLogin={true} />
    </main>
  )
}
