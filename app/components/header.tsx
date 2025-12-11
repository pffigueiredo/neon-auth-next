import { GitHubIcon, UserButton } from '@neondatabase/auth/react/ui';
import Link from 'next/link';

import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-12 justify-between border-b bg-background/60 px-4 backdrop-blur md:h-14 md:px-6">
      <Link href="/" className="flex items-center gap-2">
        <svg
          className="size-5"
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
        <span className="font-semibold">NEON AUTH DEMO</span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          href="https://github.com/neondatabase-labs/neon-js"
          target="_blank"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <GitHubIcon />
        </Link>
        <ThemeToggle />
        <UserButton size="icon" />
      </nav>
    </header>
  );
}
