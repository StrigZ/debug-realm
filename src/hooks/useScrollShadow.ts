'use client';

import { useRef, useState } from 'react';

export default function useScrollShadow() {
  const containerRef = useRef<HTMLUListElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    if (containerRef.current) {
      const element = containerRef.current;

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
  };
}
