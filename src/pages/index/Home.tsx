'use client';

import GameCardList from '~/components/GameCardList';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar/Sidebar';

type Props = {};
export default function Home({}: Props) {
  return (
    <>
      <main className="grid h-screen grid-cols-[250px,1fr] grid-rows-[150px,1fr] items-center justify-center gap-x-8 bg-slate-950 px-2 text-white">
        <Header className="col-span-full" />
        <Sidebar className="h-full w-full overflow-y-scroll pb-8 font-mono" />
        <div className="col-start-2 row-start-2 h-full w-full space-y-8 overflow-y-scroll">
          <h1 className="sticky top-0 z-30 bg-slate-950 pb-4 font-mono text-4xl font-bold">
            Top Selling
          </h1>
          <GameCardList className="pb-8 pr-8" />
        </div>
      </main>
    </>
  );
}
