'use client';

import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';

import { useThemeContext } from '~/context/ThemeContextProvider';
import { cn } from '~/lib/utils';

import Cart from './Cart/Cart';
import { Button } from './ui/button';

type Props = { className?: string };
export default function Header({ className }: Props) {
  const { toggleThemeHandler, isDarkTheme } = useThemeContext();

  return (
    <header
      className={cn(
        'fixed top-0 z-50 flex w-full items-center justify-center gap-4 bg-accent/75 p-8 text-accent-foreground md:justify-between',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="text-4xl text-foreground">
          Debug.Realm
        </Link>
        <Button onClick={() => toggleThemeHandler()}>
          {isDarkTheme ? <Moon /> : <Sun />}
        </Button>
      </div>
      <div className="flex items-center gap-1"></div>
      <Cart />
    </header>
  );
}
