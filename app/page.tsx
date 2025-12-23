'use client';

import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  UserAvatar,
  AuthLoading,
} from '@neondatabase/auth/react/ui';
import { useContext } from 'react';
import { AuthUIContext } from '@neondatabase/auth/react/ui';

function NeonLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
        className="fill-[#00E599]"
      />
      <path
        d="M18 28C23.5228 28 28 23.5228 28 18C28 12.4772 23.5228 8 18 8C12.4772 8 8 12.4772 8 18C8 23.5228 12.4772 28 18 28Z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function SignedInContent() {
  const { hooks } = useContext(AuthUIContext);
  const { data: session } = hooks.useSession();

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-4 rounded-lg border bg-card p-6">
        <UserAvatar user={session?.user} className="size-16" />
        <div className="text-left">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="font-semibold text-lg">
            {session?.user?.name || session?.user?.email || 'User'}
          </p>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/account/settings"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Account Settings
        </Link>
        <Link
          href="/account/security"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Security
        </Link>
        <Link
          href="/account/security"
          className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Sessions
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-6 text-center">
          <NeonLogo className="size-20" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Neon Auth Demo
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Explore authentication features powered by Neon Auth. Sign in with
            social providers, and more.
          </p>
        </div>

        {/* Auth State Section */}
        <AuthLoading>
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </div>
        </AuthLoading>

        <SignedOut>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/auth/sign-in"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Create Account
              </Link>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <SignedInContent />
        </SignedIn>

        {/* Features Grid */}
        <div className="w-full">
          <h2 className="text-center text-2xl font-semibold mb-6">
            Authentication Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="🔐"
              title="Email & Password"
              description="Traditional email/password authentication with secure password hashing."
            />
            <FeatureCard
              icon="🌐"
              title="Social Login"
              description="Sign in with GitHub or Google OAuth providers."
            />
            <FeatureCard
              icon="🔑"
              title="Password Recovery"
              description="Secure password reset via email verification."
            />
            <FeatureCard
              icon="📱"
              title="Session Management"
              description="View and manage active sessions across devices."
            />
            <FeatureCard
              icon="⚡"
              title="Powered by Neon"
              description="Built on Neon's serverless Postgres with instant scaling."
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://neon.com/docs/neon-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Documentation
          </a>
          <a
            href="https://github.com/neondatabase/neon-js"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://neon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Neon
          </a>
        </div>
      </main>
    </div>
  );
}
