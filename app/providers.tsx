'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      social={{
        providers: ['github', 'google'],
      }}
      credentials={{
        forgotPassword: true,
      }}
      localization={{
        SIGN_IN: 'Welcome Back',
        SIGN_IN_DESCRIPTION: 'Sign in to your account to continue',
        SIGN_UP: 'Create Account',
        SIGN_UP_DESCRIPTION: 'Join us today and get started',
        FORGOT_PASSWORD: 'Forgot Password?',
        FORGOT_PASSWORD_DESCRIPTION: 'Enter your email to reset your password',
        RESET_PASSWORD: 'Reset Password',
        RESET_PASSWORD_DESCRIPTION: 'Enter your new password below',
        OR_CONTINUE_WITH: 'or continue with',
      }}
      Link={Link}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
