'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ASSETS } from '@/lib/destinations';

// Passport cover button shown beside the map. If the cover image hasn't been
// uploaded yet (public/assets/passport-cover.png), fall back to a labelled
// parchment tile so the button still works — same graceful pattern as the map pins.
export default function PassportButton() {
  const [noImg, setNoImg] = useState(false);
  return (
    <Link
      href="/passport"
      className="passport-cta"
      aria-label="How to make your passport — watch the video"
    >
      {!noImg ? (
        <img
          className="passport-cover"
          src={`${ASSETS}passport-cover.png`}
          alt=""
          aria-hidden="true"
          onError={() => setNoImg(true)}
        />
      ) : (
        <span className="passport-cover passport-cover-fallback" aria-hidden="true">
          Passport
        </span>
      )}
    </Link>
  );
}
