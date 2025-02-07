'use client';

import GameCardList from '~/components/GameCardList';
import Header from '~/components/Header';

type Props = {};
export default function Home({}: Props) {
  return (
    <>
      <main className="grid h-screen grid-cols-[250px,1fr] grid-rows-[150px,1fr] items-center justify-center bg-slate-950 px-2 text-white">
        <Header className="col-span-full" />
        <GameCardList className="col-start-2 row-start-2 h-full w-full overflow-y-scroll" />
      </main>
    </>
  );
}
