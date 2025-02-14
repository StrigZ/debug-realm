import { Minus, Plus } from 'lucide-react';

import { useCartContext } from '~/context/CartContextProvider';

import GameCard from '../GameCard';

export default function CartContent() {
  const { cart, addItem, deleteItem } = useCartContext();

  return (
    <ul className="grid auto-rows-[250px] gap-4 overflow-auto px-4">
      {cart.length > 0 ? (
        cart.map(({ game, id, amount }) => (
          <li key={id} className="flex flex-col gap-4">
            <GameCard
              {...game}
              isCartButtonVisible={false}
              className="flex-1"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                className="transition-transform hover:scale-110 active:scale-95"
                type="button"
                onClick={() => deleteItem(id)}
              >
                <Minus />
              </button>
              <p className="flex h-10 w-10 items-center justify-center rounded border">
                {amount}
              </p>
              <button
                className="transition-transform hover:scale-110 active:scale-95"
                type="button"
                onClick={() => addItem(game)}
              >
                <Plus />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="m-auto">Nothing here yet...</p>
      )}
    </ul>
  );
}
