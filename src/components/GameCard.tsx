import { CircleOff, Gamepad2, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCartContext } from '~/context/CartContextProvider';
import { cn } from '~/lib/utils';
import type { DetailedGame, Game, Tag } from '~/types';

export const nsfwTags = ['nsfw', 'hentai', 'sex', 'nudity'];

export const checkIsNsfw = ({
  tags,
  name,
  slug,
}: {
  tags?: Tag[];
  name: string;
  slug: string;
}): boolean => {
  if (tags) {
    const nsfwTag = tags?.find((tag) => nsfwTags.includes(tag.slug));
    if (nsfwTag) {
      return true;
    }
  }
  return (
    name
      .toLowerCase()
      .split(' ')
      .some((word) => nsfwTags.includes(word)) ||
    slug
      .toLowerCase()
      .split('-')
      .some((word) => nsfwTags.includes(word))
  );
};

export default function GameCard(
  props: (Game | DetailedGame) & {
    className?: string;
    isCartButtonVisible?: boolean;
  },
) {
  const { className, isCartButtonVisible = true, ...game } = props;
  const { tags, slug, name, background_image, genres } = game;

  const isNsfw = checkIsNsfw({ name, slug, tags });

  const { addItem } = useCartContext();

  return (
    <article
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded border bg-card text-card-foreground',
        className,
      )}
    >
      <Link href={'games/' + slug} className="absolute inset-0 z-10" />
      <div
        className={cn(
          'relative flex w-full flex-1 items-center justify-center',
          { 'border-b border-border': !background_image || isNsfw },
        )}
      >
        {isNsfw ? (
          <CircleOff size={72} className="text-primary-foreground" />
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
        <p className="max-w-[80%] truncate text-lg font-medium">{name}</p>
        <ul className="flex max-w-[80%] gap-1 truncate text-xs italic text-muted-foreground">
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        {isCartButtonVisible && (
          <button
            type="button"
            className="absolute inset-y-0 right-2 z-20 flex items-center justify-center rounded-full p-2 text-primary transition-transform hover:scale-110 active:scale-95"
            onClick={() => addItem(game)}
          >
            <ShoppingCart />
          </button>
        )}
      </div>
    </article>
  );
}
