'use client';

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import type { DetailedGame, Game } from '~/types';

export type CartItem = {
  id: number;
  game: Game | DetailedGame;
  amount: number;
};

export type CartContext = {
  cart: CartItem[];
  isCheckout: boolean;
  isCheckoutPending: boolean;
  addItem: (game: Game | DetailedGame) => void;
  deleteItem: (id: number) => void;
  checkout: () => void;
};

const cartContext = createContext<CartContext>({
  cart: [],
  isCheckout: false,
  isCheckoutPending: false,
  addItem: () => {
    // do nothing
  },
  deleteItem: () => {
    // do nothing
  },
  checkout: () => {
    // do nothing
  },
});

export const useCartContext = () => useContext(cartContext);

type Props = { children: ReactNode };
export default function CartContextProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutPending, setIsCheckoutPending] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const addItem: CartContext['addItem'] = useCallback((game) => {
    setCart((prev) =>
      prev.find((item) => item.id === game.id)
        ? prev.map((item) =>
            item.id === game.id ? { ...item, amount: ++item.amount } : item,
          )
        : [...prev, { game, id: game.id, amount: 1 }],
    );
    setIsCheckout(false);
  }, []);

  const deleteItem: CartContext['deleteItem'] = useCallback(
    (id) =>
      setCart((prev) => {
        const itemToDelete = prev.find((item) => item.id === id);

        if (!itemToDelete) {
          return prev;
        }

        if (itemToDelete.amount === 1) {
          return prev.filter((item) => item.id !== id);
        }

        return prev.map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        );
      }),
    [],
  );

  const checkout: CartContext['checkout'] = useCallback(() => {
    setIsCheckoutPending(true);
    setTimeout(() => {
      setIsCheckout(true);
      setIsCheckoutPending(false);
    }, 2000);
  }, []);

  const value: CartContext = {
    cart,
    isCheckout,
    isCheckoutPending,
    addItem,
    deleteItem,
    checkout,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
