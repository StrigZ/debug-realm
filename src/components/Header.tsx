import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { cn } from '~/utils/utils';

type Props = { className?: string };
export default function Header({ className }: Props) {
  return (
    <header className={cn('flex gap-4 p-8', className)}>
      <Link href="/" className="flex-1 text-4xl">
        Debug.Realm
      </Link>
      <nav>
        <ul className="flex items-center gap-8 text-3xl">
          <li>
            <Link href="/" className="hover:underline">
              Store
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-white p-4 transition-transform hover:scale-110 active:scale-95"
            >
              <ShoppingCart className="text-slate-950" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
