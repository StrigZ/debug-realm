import { CircleOff, Gamepad2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCartContext } from '~/context/CartContextProvider';
import { cn } from '~/lib/utils';
import { type Game } from '~/types';

const nsfwTags = ['nsfw', 'hentai', 'sex', 'nudity'];

export default function GameCard(
  props: Game & { className?: string; isCartButtonVisible?: boolean },
) {
  const { className, isCartButtonVisible = true, ...game } = props;
  const { tags, slug, name, background_image, genres } = game;

  const isNsfw =
    tags?.find((tag) => nsfwTags.includes(tag.slug)) ??
    (name
      .toLowerCase()
      .split(' ')
      .some((word) => nsfwTags.includes(word)) ||
      slug
        .toLowerCase()
        .split('-')
        .some((word) => nsfwTags.includes(word)));

  const { addItem } = useCartContext();

  return (
    <article
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded bg-purple-900',
        className,
      )}
    >
      <Link href={'games/' + slug} className="absolute inset-0 z-10" />
      <div
        className={cn(
          'relative flex w-full flex-1 items-center justify-center',
          { 'border-b border-white': !background_image || isNsfw },
        )}
      >
        {isNsfw ? (
          <CircleOff size={72} />
        ) : background_image ? (
          <Image
            className="object-cover object-top"
            src={background_image}
            alt={name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, 25vw"
            fill
          />
        ) : (
          <Gamepad2 size={72} />
        )}
      </div>
      <div className="relative h-16 p-2">
        <p className="truncate text-lg font-medium">{name}</p>
        <ul className="flex gap-1 text-xs italic text-gray-200">
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        {isCartButtonVisible && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 z-20 flex items-center justify-center rounded-full p-2 transition-transform hover:scale-110 active:scale-95"
            onClick={() => addItem(game)}
          >
            <ShoppingCart className="text-white" />
          </button>
        )}
      </div>
    </article>
  );
}
