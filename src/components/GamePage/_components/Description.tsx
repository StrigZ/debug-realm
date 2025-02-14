'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '~/lib/utils';
import type { DetailedGame } from '~/types';

export default function Description({ description }: DetailedGame) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const e = descriptionRef.current;
      if (e.scrollHeight > e.offsetHeight) {
        setIsOverflowing(true);
      }
    }
  }, []);

  return (
    <article className="flex-[3] space-y-4">
      <div className="relative pb-2">
        <h3 className="text-2xl">Description</h3>
        <div className="absolute bottom-0 left-0 h-px w-1/3 bg-muted"></div>
      </div>
      <div className={cn({ 'space-y-4': isExpanded })}>
        <div className="relative">
          <div
            className={cn('relative space-y-4 text-muted-foreground', {
              'max-h-[250px] overflow-hidden': !isExpanded,
            })}
            ref={descriptionRef}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {!isExpanded && isOverflowing && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
          )}
        </div>
        {isOverflowing && (
          <button
            className="hover:text-muted"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {!isExpanded ? 'Show more' : 'Show less'}
          </button>
        )}
      </div>
    </article>
  );
}
