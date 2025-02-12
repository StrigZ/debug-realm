'use client';

import { ShoppingCart, X } from 'lucide-react';
import { useWindowSize } from 'usehooks-ts';

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
import { cn } from '~/lib/utils';

import CartContent from './CartContent';

export default function Cart() {
  const { width = 0 } = useWindowSize();
  const isMobile = width < 768;

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-white p-4 transition-transform hover:scale-110 active:scale-95 md:static">
        <ShoppingCart className="text-slate-950" />
      </DrawerTrigger>
      <DrawerOverlay className="fixed inset-0 bg-black/40" />
      <DrawerContent
        className={cn('rounded-none', {
          'inset-y-0 left-[unset] mt-0 w-[min(40vw,450px)]': !isMobile,
          'mt-0 h-[min(50vh,450px)] w-full': isMobile,
        })}
      >
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-3xl">Cart</DrawerTitle>
          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>
        <CartContent />
        <DrawerFooter>
          <button type="button" className="text-xl">
            Checkout
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
