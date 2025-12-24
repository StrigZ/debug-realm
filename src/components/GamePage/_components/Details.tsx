import { format } from 'date-fns';
import Image from 'next/image';

import type { DetailedGame } from '~/types';

const PLATFORMS = [
  'PC',
  'Xbox Series S/X',
  'PlayStation 5',
  'Xbox One',
  'PlayStation 4',
  'Nintendo Switch',
  'Xbox 360',
  'PlayStation 3',
] as const;

type Platform = (typeof PLATFORMS)[number];

const PLATFORM_ICONS: Record<Platform, string> = {
  PC: '/windows-10.svg',
  'Xbox Series S/X': '/xbox.svg',
  'PlayStation 5': '/playstation.svg',
  'Xbox One': '/xbox.svg',
  'PlayStation 4': '/playstation.svg',
  'Nintendo Switch': '/nintendo-switch.svg',
  'Xbox 360': '/xbox.svg',
  'PlayStation 3': '/playstation.svg',
};

type Details = {
  categoryName: string;
  properties: DetailsProperty[];
};

type DetailsProperty = {
  id: string | number;
  value: string;
};

export default function Details({
  platforms,
  genres,
  developers,
  released,
}: DetailedGame) {
  const platformIcons: DetailsProperty[] = [];

  platforms.forEach(({ platform: { name, id } }) => {
    if (!PLATFORMS.includes(name as Platform)) return;

    const icon = PLATFORM_ICONS[name as Platform];

    if (!platformIcons.some((item) => item.value === icon)) {
      platformIcons.push({ id, value: icon });
    }
  });

  const details: Details[] = [
    {
      categoryName: 'Platform',
      properties: platformIcons,
    },
    {
      categoryName: 'Genre',
      properties: genres.map((item) => ({
        id: item.id,
        value: item.name,
      })),
    },
    {
      categoryName: 'Publisher',
      properties: developers.map((item) => ({
        id: item.id,
        value: item.name,
      })),
    },
    {
      categoryName: 'Released',
      properties: [
        { id: 0, value: format(released, 'd MMMM yyyy') },
      ],
    },
  ];

  return (
    <div className="flex-[2] space-y-4">
      <div className="relative pb-2">
        <h3 className="text-2xl">Game Details</h3>
        <div className="absolute bottom-0 left-0 h-px w-1/3 bg-muted" />
      </div>

      <ul className="flex flex-col gap-3">
        {details.map(({ categoryName, properties }) => (
          <li
            key={categoryName}
            className="grid grid-cols-5 items-center gap-2 border-b pb-2 last:border-none"
          >
            <span className="col-span-1 text-base font-semibold">
              {categoryName}:
            </span>

            <ul className="col-span-full flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground xl:col-start-2">
              {properties.map(({ id, value }) => (
                <li key={id} className="w-max text-base italic">
                  {value.startsWith('/') ? (
                    <Image src={value} width={24} height={24} alt="" />
                  ) : (
                    value
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
