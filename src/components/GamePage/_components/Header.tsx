import { Rss } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

import metacriticIcon from '~/../public/metacritic.svg';
import redditIcon from '~/../public/reddit.svg';
import type { DetailedGame } from '~/types';

import ActionCard from './ActionCard';

export default function Header(game: DetailedGame) {
  const { metacritic, website, reddit_url, metacritic_url } = game;
  return (
    <div className="relative -mt-20 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex-[2] space-y-4">
        <h2 className="text-4xl drop-shadow-2xl">{game.name}</h2>
        {(metacritic || website || reddit_url || metacritic_url) && (
          <ul className="flex text-muted-foreground">
            {metacritic && metacritic_url && (
              <HeaderLink
                displayText={`${metacritic}/100`}
                icon={
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={metacriticIcon}
                    width={24}
                    height={24}
                    alt="metacritic score"
                  />
                }
                url={metacritic_url}
              />
            )}
            {website && (
              <HeaderLink displayText="Website" icon={<Rss />} url={website} />
            )}
            {reddit_url && (
              <HeaderLink
                displayText="Reddit"
                icon={
                  <Image
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    src={redditIcon}
                    width={24}
                    height={24}
                    alt="metacritic score"
                  />
                }
                url={reddit_url}
              />
            )}
          </ul>
        )}
      </div>
      <ActionCard {...game} />
    </div>
  );
}

type Props = { url: string; displayText: string; icon: ReactNode };
function HeaderLink({ url, displayText, icon }: Props) {
  return (
    <a
      href={url}
      className="flex items-center gap-2 border-r border-border px-4 leading-none first:pl-0 last:border-none only:border-none only:p-0 hover:underline"
    >
      {icon}
      {displayText}
    </a>
  );
}
