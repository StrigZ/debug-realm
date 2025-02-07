import { ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { type Game } from '~/types';
import { cn } from '~/utils/utils';

import GameCard from './GameCard';

type Props = { className?: string };
export default function Header({ className }: Props) {
  return (
    <>
      <header className={cn('flex gap-4 p-8', className)}>
        <Link href="/" className="text-4xl">
          Debug.Realm
        </Link>

        <Drawer direction="right">
          <DrawerTrigger className="ml-auto flex items-center justify-center rounded-full bg-white p-4 transition-transform hover:scale-110 active:scale-95">
            <ShoppingCart className="text-slate-950" />
          </DrawerTrigger>
          <DrawerOverlay className="fixed inset-0 bg-black/40" />
          <DrawerContent className="inset-y-0 left-[unset] mt-0 w-[min(40vw,450px)] rounded-none">
            <DrawerHeader className="flex justify-between">
              <DrawerTitle className="text-3xl">Cart</DrawerTitle>
              <DrawerClose asChild>
                <X />
              </DrawerClose>
            </DrawerHeader>
            <ul>
              {([] as Game[]).map((game) => (
                <li key={game.id}>
                  <GameCard {...game} />
                </li>
              ))}
            </ul>
            <DrawerFooter>
              <button type="button" className="text-xl">
                Checkout
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </header>
    </>
  );
}
