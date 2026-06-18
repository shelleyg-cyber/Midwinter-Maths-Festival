import Link from 'next/link';
import VideoSlot from '@/components/VideoSlot';
import SectionLabel from '@/components/SectionLabel';

export const metadata = { title: 'Tile patterns — Maths Around Our World' };

const video = { id: '4a0FP9iNBDo', title: 'Tile patterns' };

export default function TilePatternsPage() {
  return (
    <main className="dest passport-page">
      <Link href="/" className="btn btn-back">← Back to map</Link>
      <h1>Tile patterns</h1>
      <section className="card look-first">
        <SectionLabel>Watch</SectionLabel>
        <VideoSlot video={video} />
      </section>
    </main>
  );
}
