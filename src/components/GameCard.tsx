import Image from 'next/image';
import Link from 'next/link';

import { cn } from '~/lib/utils';
import { type Game } from '~/types';

export default function GameCard({
  slug,
  background_image,
  name,
  genres,
  classNames,
}: Game & { classNames?: string }) {
  return (
    <article
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded bg-slate-600',
        classNames,
      )}
    >
      <Link href={'games/' + slug} className="absolute inset-0 z-10" />
      <div className="relative w-full flex-1">
        <Image
          className="object-cover object-top"
          src={background_image}
          alt={name + ' image'}
          fill
        />
      </div>
      <div className="p-2">
        <p className="text-lg font-medium">{name}</p>
        <ul className="flex gap-1 text-xs italic text-gray-200">
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
