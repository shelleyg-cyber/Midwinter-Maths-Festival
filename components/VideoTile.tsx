'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ASSETS } from '@/lib/destinations';

// A small image button on the map page that opens a page with an embedded
// video. If its motif image hasn't been uploaded yet, it falls back to a
// labelled tile — the same graceful pattern used by the map pins and passport.
export default function VideoTile({
  href,
  img,
  label,
}: {
  href: string;
  img: string;
  label: string;
}) {
  const [noImg, setNoImg] = useState(false);
  return (
    <Link href={href} className="map-tile" aria-label={`${label} — watch the video`}>
      {!noImg ? (
        <img
          className="map-tile-img"
          src={`${ASSETS}${img}`}
          alt=""
          aria-hidden="true"
          onError={() => setNoImg(true)}
        />
      ) : (
        <span className="map-tile-img map-tile-fallback" aria-hidden="true">
          {label}
        </span>
      )}
      <span className="map-tile-label">{label}</span>
    </Link>
  );
}
