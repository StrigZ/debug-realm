'use client';

import Filter from '~/components/Filter';
import GameCardList from '~/components/GameCardList';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar/Sidebar';
import useFetchGames from '~/hooks/useFetchGames';
import useFetchGenres from '~/hooks/useFetchGenres';
import type { Game, Genre } from '~/types';

export default function Home() {
  const {
    data: games,
    handleFilterChange,
    isLoading: isGamesQueryLoading,
    activeGenre,
    activeDate,
    activeOrdering,
  } = useFetchGames();
  const { data: genres, isLoading: isGenresQueryLoading } = useFetchGenres();

  return (
    <main className="grid h-screen grid-cols-[250px,1fr] grid-rows-[150px,1fr] items-center justify-center gap-x-8 bg-slate-950 px-2 font-mono text-white">
      <Header className="col-span-full" />
      <Sidebar
        className="h-full w-full overflow-y-scroll pb-8"
        genres={(genres?.results as Genre[]) ?? []}
        isLoading={isGenresQueryLoading}
        handleFilterChange={handleFilterChange}
        activeGenre={activeGenre}
      />
      <div className="col-start-2 row-start-2 h-full w-full space-y-8 overflow-y-scroll pb-8 pr-8">
        <Filter
          date={activeDate}
          ordering={activeOrdering}
          classNames="sticky top-0 z-30"
          handleFilterChange={handleFilterChange}
        />
        <GameCardList
          className="font-sans"
          games={(games?.results as Game[]) ?? []}
          isLoading={isGamesQueryLoading}
        />
      </div>
    </main>
  );
}
