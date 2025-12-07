'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth/client';
import {
  SignedIn,
  SignedOut,
  UserAvatar,
  AuthUIContext,
} from '@neondatabase/auth/react/ui';

export default function AnonymousPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<unknown>(null);

  // Link account form state
  const [linkEmail, setLinkEmail] = useState('');
  const [linkPassword, setLinkPassword] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const { hooks } = useContext(AuthUIContext);
  const { data: session, refetch } = hooks.useSession();

  // Check if user is anonymous
  const isAnonymous: boolean =
    session?.user && 'isAnonymous' in session.user
      ? Boolean(session?.user?.isAnonymous)
      : false;

  const handleSignInAnonymously = async () => {
    setIsLoading(true);
    setError(null);
    setLastResponse(null);

    try {
      const response = await authClient.signIn.anonymous();
      setLastResponse(response);

      if (response.error) {
        setError(response.error.message || 'Anonymous sign-in failed');
      } else {
        refetch();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setLastResponse({ error: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      setLastResponse(null);
      setError(null);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLinking(true);
    setError(null);
    setLastResponse(null);

    try {
      const response = await authClient.signIn.email({
        email: linkEmail,
        password: linkPassword,
      });

      setLastResponse(response);

      if (response.error) {
        setError(response.error.message || 'Link account failed');
      } else {
        setLinkEmail('');
        setLinkPassword('');
        refetch();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setLastResponse({ error: errorMessage });
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-start justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-5xl">👻</span>
          <h1 className="mt-4 text-2xl font-bold">Anonymous Sign In</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Try out the app without creating an account. You can link your
            session to a permanent account later.
          </p>
        </div>

        {/* Current Session */}
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Current Session
          </h2>

          <SignedOut>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-2 rounded-full bg-muted-foreground" />
              Not authenticated
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              <UserAvatar user={session?.user} className="size-12" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Signed in as</p>
                <p className="font-medium truncate">
                  {session?.user?.name ||
                    session?.user?.email ||
                    'Anonymous User'}
                </p>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  ID: {session?.user?.id}
                </p>
                {isAnonymous && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">
                    Anonymous
                  </span>
                )}
              </div>
            </div>
          </SignedIn>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <SignedOut>
            <button
              onClick={handleSignInAnonymously}
              disabled={isLoading}
              className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </>
              ) : (
                '👻 Sign In Anonymously'
              )}
            </button>
          </SignedOut>

          <SignedIn>
            <button
              onClick={handleSignInAnonymously}
              disabled={isLoading}
              className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Try Again (new anonymous session)'}
            </button>

            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full inline-flex h-10 items-center justify-center rounded-md border border-destructive/30 bg-transparent px-4 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Out
            </button>
          </SignedIn>
        </div>

        {/* Link Account Form (only for anonymous users) */}
        {isAnonymous && (
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Link Account
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Convert your anonymous session to a permanent account.
            </p>

            <form onSubmit={handleLinkAccount} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={linkEmail}
                  onChange={(e) => setLinkEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={linkPassword}
                  onChange={(e) => setLinkPassword(e.target.value)}
                  placeholder="Choose a password"
                  required
                  minLength={8}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                disabled={isLinking || !linkEmail || !linkPassword}
                className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLinking ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Linking...
                  </>
                ) : (
                  'Link Account'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
            <p className="text-sm font-medium text-destructive">Error</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        )}

        {/* Response Display */}
        {lastResponse !== null && (
          <div className="rounded-lg border bg-muted p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Last Response
            </h2>
            <pre className="text-xs font-mono overflow-auto max-h-40 text-primary">
              {JSON.stringify(lastResponse, null, 2)}
            </pre>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
