'use client';

import { Check, Loader, ShoppingCart, X } from 'lucide-react';
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
import { useCartContext } from '~/context/CartContextProvider';
import { cn } from '~/lib/utils';

import CartContent from './CartContent';

export default function Cart() {
  const { width = 0 } = useWindowSize();
  const isMobile = width < 768;

  const { checkout, isCheckout, isCheckoutPending } = useCartContext();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-primary p-4 text-primary-foreground shadow-xl transition-transform hover:scale-110 active:scale-95 md:static">
        <ShoppingCart />
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
          <button
            type="button"
            className={cn(
              'flex items-center justify-center gap-2 rounded p-2 text-xl transition-transform active:scale-95 disabled:active:scale-100',
              {
                'bg-primary text-primary-foreground': !isCheckout,
              },
            )}
            onClick={checkout}
            aria-disabled={isCheckout}
            disabled={isCheckout}
          >
            {isCheckout && (
              <>
                Success! <Check className="text-green-500" />
              </>
            )}
            {isCheckoutPending && <Loader className="animate-spin" />}
            {!isCheckout && !isCheckoutPending && 'Checkout'}
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
