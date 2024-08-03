"use client"

import React, { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ErrorMessage } from '@/lib/auth'
import styles from './AuthForm.module.css'

const reasonMap: { [key: string]: string } = {
  unauthorized: 'You need to login first.',
  signup: 'You can now try to login.',
}

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const apiEndpoint = isLogin ? "/api/login" : "/api/register";
  const subject = isLogin ? "Sign in" : "Sign up";
  const reason = useSearchParams().get('reason');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget)
    const jsonBody = {
      username: formData.get('username'),
      password: formData.get('password'),
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    })

    response.redirected
    if (!response.ok) {
      try {
        const msg: ErrorMessage = await response.json();
        setError(msg.message);
      } catch (e: any) {
        setError("Undetermined error.");
      }

    } else if (!isLogin) {
      push('/login?reason=signup');
    } else if (isLogin) {
      push('/profile');
    }

    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1>{subject}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        {reason && reasonMap[reason] && <span>{reasonMap[reason]}</span>}
        <input type="text" name='username' required placeholder='Username' />
        <input type="password" name='password' required placeholder='Password' />
        {error && <span className={styles.error}>{error}</span>}
        <button type='submit' disabled={isLoading}>{isLoading ? 'Loading...' : subject}</button>
      </form>
    </div>
  )
}
