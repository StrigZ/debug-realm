import { format } from 'date-fns';
import Image, { type ImageProps } from 'next/image';

import nintendoSwitchIcon from '~/../public/nintendo-switch.svg';
import playstationIcon from '~/../public/playstation.svg';
import windowsIcon from '~/../public/windows-10.svg';
import xboxIcon from '~/../public/xbox.svg';
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

const PLATFORM_ICONS: Record<Platform, ImageProps> = {
  PC: windowsIcon as ImageProps,
  'Xbox Series S/X': xboxIcon as ImageProps,
  'PlayStation 5': playstationIcon as ImageProps,
  'Xbox One': xboxIcon as ImageProps,
  'PlayStation 4': playstationIcon as ImageProps,
  'Nintendo Switch': nintendoSwitchIcon as ImageProps,
  'Xbox 360': xboxIcon as ImageProps,
  'PlayStation 3': playstationIcon as ImageProps,
};

type Details = {
  categoryName: string;
  properties: DetailsProperty[];
};

type DetailsProperty = { id: string | number; value: string | ImageProps };

export default function Details({
  platforms,
  genres,
  developers,
  released,
}: DetailedGame) {
  const platformIcons: DetailsProperty[] = [];

  platforms.forEach(({ platform: { name, id } }) => {
    if (!PLATFORMS.includes(name as Platform)) {
      return;
    }

    const icon = PLATFORM_ICONS[name as Platform];

    if (
      !platformIcons.some(
        (item) =>
          !(typeof item.value === 'string') && item.value.src === icon.src,
      )
    ) {
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
      properties: genres.map((item) => ({ id: item.id, value: item.name })),
    },
    {
      categoryName: 'Publisher',
      properties: developers.map((item) => ({ id: item.id, value: item.name })),
    },
    {
      categoryName: 'Released',
      properties: [{ id: 0, value: format(released, 'd MMMM yyyy') }],
    },
  ];

  return (
    <div className="flex-[2] space-y-4">
      <div className="relative pb-2">
        <h3 className="text-2xl">Game Details</h3>
        <div className="absolute bottom-0 left-0 h-px w-1/3 bg-muted"></div>
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
                  {typeof value === 'string' ? (
                    value
                  ) : (
                    <Image src={value.src} width={24} height={24} alt="" />
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
