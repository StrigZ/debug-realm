'use client';

import GameCardList from '~/components/GameCardList';

type Props = {};
export default function Home({}: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 text-red-50">
      <GameCardList />
    </main>
  );
}
