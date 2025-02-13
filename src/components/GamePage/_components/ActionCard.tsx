'use client';

import { Check, DollarSign, Loader, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { useCartContext } from '~/context/CartContextProvider';
import type { DetailedGame } from '~/types';

export default function ActionCard(game: DetailedGame) {
  const { addItem } = useCartContext();
  const [isBuyingPending, setIsBuyingPending] = useState(false);
  const [isBought, setIsBought] = useState(false);

  const handleGameBuy = () => {
    setIsBuyingPending(true);
    setTimeout(() => {
      setIsBought(true);
      setIsBuyingPending(false);
    }, 2000);
  };
  return (
    <div className="z-20 w-full max-w-sm flex-1 space-y-4 rounded bg-card p-4 shadow">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded bg-card-foreground p-4 font-bold text-foreground text-slate-950 transition-transform hover:scale-105 active:scale-100"
        onClick={() => addItem(game)}
      >
        <ShoppingCart /> Add to Cart
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded border border-card-foreground bg-card p-4 font-bold text-card-foreground text-slate-950 transition-transform hover:scale-105 active:scale-100 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
        onClick={handleGameBuy}
        disabled={isBought}
        aria-disabled={isBought}
      >
        {isBought && (
          <>
            Success! <Check className="text-green-500" />
          </>
        )}
        {isBuyingPending && <Loader className="animate-spin" />}
        {!isBought && !isBuyingPending && (
          <>
            <DollarSign className="text-green-500" /> Buy now
          </>
        )}
      </button>
    </div>
  );
}
