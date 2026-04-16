import React, { useEffect, useRef, useState } from 'react';
import { runWhenIdle } from '../utils/idleLoad';

export default function DeferredSection({ children, fallback = null, rootMargin = '250px 0px' }) {
  const [shouldRender, setShouldRender] = useState(false);
  const hostRef = useRef(null);

  useEffect(() => {
    if (shouldRender) return;

    const node = hostRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      const cleanupIdle = runWhenIdle(() => setShouldRender(true), 1400);
      return cleanupIdle;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    const cleanupIdle = runWhenIdle(() => setShouldRender(true), 2600);

    return () => {
      cleanupIdle();
      observer.disconnect();
    };
  }, [rootMargin, shouldRender]);

  return <div ref={hostRef}>{shouldRender ? children : fallback}</div>;
}
