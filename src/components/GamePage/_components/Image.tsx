import { CircleOff, Gamepad2 } from 'lucide-react';
import Image from 'next/image';

import { checkIsNsfw } from '~/components/GameCard';
import type { DetailedGame } from '~/types';

export default function BackgroundImage({
  background_image,
  name,
  slug,
  tags,
}: DetailedGame) {
  const isNsfw = checkIsNsfw({ name, slug, tags });

  return (
    <div className="relative mx-auto flex h-[50vh] w-full max-w-[1920px] flex-1 grow items-center justify-center overflow-hidden shadow-xl">
      {isNsfw ? (
        <CircleOff size={98} />
      ) : background_image ? (
        <Image
          className="object-cover object-top"
          src={background_image}
          alt={name}
          sizes="100vw"
          fill
        />
      ) : (
        <Gamepad2 size={98} />
      )}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
