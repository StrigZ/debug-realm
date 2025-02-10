'use client';

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import type { Game } from '~/types';

export type CartItem = {
  id: number;
  game: Game;
  amount: number;
};

export type CartContext = {
  cart: CartItem[];
  addItem: (game: Game) => void;
  deleteItem: (id: number) => void;
};

const cartContext = createContext<CartContext>({
  cart: [],
  addItem: () => {
    // do nothing
  },
  deleteItem: () => {
    // do nothing
  },
});

export const useCartContext = () => useContext(cartContext);

type Props = { children: ReactNode };
export default function CartContextProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItem: CartContext['addItem'] = useCallback(
    (game) =>
      setCart((prev) =>
        prev.find((item) => item.id === game.id)
          ? prev.map((item) =>
              item.id === game.id ? { ...item, amount: ++item.amount } : item,
            )
          : [...prev, { game, id: game.id, amount: 1 }],
      ),
    [],
  );

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

  const value: CartContext = { cart, addItem, deleteItem };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
