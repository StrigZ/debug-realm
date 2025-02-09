import { CircleOff, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '~/lib/utils';
import { type Game } from '~/types';

const nsfwTags = ['nsfw', 'hentai', 'sex', 'nudity'];

export default function GameCard({
  slug,
  background_image,
  name,
  genres,
  className,
  tags,
}: Game & { className?: string }) {
  const isNsfw =
    tags.find((tag) => nsfwTags.includes(tag.slug)) ??
    nsfwTags.includes(name.toLowerCase());

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
          <CircleOff size={98} />
        ) : background_image ? (
          <Image
            className="object-cover object-top"
            src={background_image}
            alt={name + ' image'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw, 25vw"
            fill
          />
        ) : (
          <Gamepad2 size={128} />
        )}
      </div>

      <div className="h-16 p-2">
        <p className="truncate text-lg font-medium">{name}</p>
        <ul className="flex gap-1 text-xs italic text-gray-200">
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
