'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { destinations } from '@/lib/destinations';

const VISITED_KEY = 'maw_visited';

function readVisited(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(VISITED_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function MapButtons() {
  const router = useRouter();
  // Read after mount so server and client markup agree on first paint.
  const [visited, setVisited] = useState<string[]>([]);
  useEffect(() => setVisited(readVisited()), []);

  const go = (slug: string) => {
    const v = Array.from(new Set([...readVisited(), slug]));
    sessionStorage.setItem(VISITED_KEY, JSON.stringify(v));
    router.push(`/destinations/${slug}`);
  };

  return (
    <>
      {destinations.map((d) => (
        <button
          key={d.slug}
          type="button"
          className="map-btn"
          style={{ left: `${d.mapPos.left}%`, top: `${d.mapPos.top}%`, '--accent': d.accent } as React.CSSProperties}
          onClick={() => go(d.slug)}
        >
          <span className="dot" aria-hidden="true"></span>
          <span className="map-btn-label">{d.name}</span>
          {visited.includes(d.slug) && <span className="tick" aria-label="visited">✓</span>}
        </button>
      ))}
    </>
  );
}
