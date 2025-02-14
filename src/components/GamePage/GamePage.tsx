'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getGame } from '~/lib/get-game';

import Description from './_components/Description';
import Details from './_components/Details';
import Header from './_components/Header';
import BackgroundImage from './_components/Image';

type Props = { slug: string };
export default function GamePage({ slug }: Props) {
  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['game', slug],
    queryFn: () => getGame(slug),
  });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate-spin" size={36} />
      </div>
    );

  if (!game || isError) {
    return notFound();
  }

  return (
    <section className="relative h-full rounded-lg shadow-xl">
      <BackgroundImage {...game} />
      <div className="container mx-auto flex flex-col gap-8 p-4 px-2 pt-0 text-foreground">
        <Header {...game} />
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <Description {...game} />
          <Details {...game} />
        </div>
      </div>
      <Link
        className="fixed left-6 top-36 z-20 flex items-center gap-2 rounded-md bg-primary p-2 text-primary-foreground transition-transform hover:scale-105 active:scale-95"
        href="/"
      >
        <ArrowLeft /> Go back
      </Link>
    </section>
  );
}
