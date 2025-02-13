import Link from 'next/link';

import { cn } from '~/lib/utils';

import Cart from './Cart/Cart';

type Props = { className?: string };
export default function Header({ className }: Props) {
  return (
    <header
      className={cn(
        'fixed top-0 z-50 flex w-full items-center justify-center gap-4 bg-slate-950/75 p-8 md:justify-between',
        className,
      )}
    >
      <Link href="/" className="text-4xl">
        Debug.Realm
      </Link>

      <Cart />
    </header>
  );
}
