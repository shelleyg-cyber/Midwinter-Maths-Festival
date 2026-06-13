'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { destinations, ASSETS } from '@/lib/destinations';

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
  // Pins whose artwork failed to load fall back to the parchment-ticket pill,
  // so the map is never left showing broken images before the files are added.
  const [noPin, setNoPin] = useState<Record<string, boolean>>({});
  useEffect(() => setVisited(readVisited()), []);

  const go = (slug: string) => {
    const v = Array.from(new Set([...readVisited(), slug]));
    sessionStorage.setItem(VISITED_KEY, JSON.stringify(v));
    router.push(`/destinations/${slug}`);
  };

  return (
    <>
      {destinations.map((d) => {
        const usePin = !noPin[d.slug];
        return (
          <button
            key={d.slug}
            type="button"
            className={'map-btn' + (usePin ? ' map-btn-pin' : '')}
            style={{ left: `${d.mapPos.left}%`, top: `${d.mapPos.top}%`, '--accent': d.accent } as React.CSSProperties}
            onClick={() => go(d.slug)}
            aria-label={d.name}
          >
            {usePin ? (
              <img
                className="map-pin-img"
                src={`${ASSETS}pins/pin-${d.slug}.png`}
                alt=""
                aria-hidden="true"
                onError={() => setNoPin((m) => ({ ...m, [d.slug]: true }))}
              />
            ) : (
              <span className="dot" aria-hidden="true"></span>
            )}
            <span className="map-btn-label">{d.name}</span>
            {visited.includes(d.slug) && <span className="tick" aria-label="visited">✓</span>}
          </button>
        );
      })}
    </>
  );
}
