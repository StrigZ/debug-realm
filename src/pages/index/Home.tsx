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
    <main className="flex h-screen flex-col gap-8 bg-slate-950 px-4 text-white">
      <Header />
      <div className="flex flex-col gap-8 md:flex-row md:overflow-hidden">
        <Sidebar
          className="shadow-inner md:h-full md:w-[300px]"
          genres={(genres?.results as Genre[]) ?? []}
          isLoading={isGenresQueryLoading}
          handleFilterChange={handleFilterChange}
          activeGenre={activeGenre}
        />
        <div className="flex flex-1 flex-col gap-8">
          <Filter
            date={activeDate}
            ordering={activeOrdering}
            handleFilterChange={handleFilterChange}
          />
          <GameCardList
            className="h-full overflow-y-scroll pb-8 font-sans"
            games={(games?.results as Game[]) ?? []}
            isLoading={isGamesQueryLoading}
          />
        </div>
      </div>
    </main>
  );
}
