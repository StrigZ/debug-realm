'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function useScrollShadow() {
  const containerRef = useRef<HTMLUListElement>(null);
  const [scroll, setScroll] = useState(0);

  const [isAtBottom, setIsAtBottom] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (containerRef.current && savedScrollPosition) {
      containerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, [pathname, searchParams]);

  const handleScroll = () => {
    if (containerRef.current) {
      const element = containerRef.current;
      setScroll(element.scrollTop);

      localStorage.setItem(
        'scrollPosition',
        containerRef.current.scrollTop.toString(),
      );

      if (isAtBottom) {
        setIsAtBottom(false);
      }

      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        setIsAtBottom(true);
      }
    }
  };

  return {
    containerRef: containerRef,
    handleScroll,
    isAtBottom,
    scroll,
  };
}
