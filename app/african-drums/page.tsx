import Link from 'next/link';
import VideoSlot from '@/components/VideoSlot';
import SectionLabel from '@/components/SectionLabel';

export const metadata = { title: 'African drums — Maths Around Our World' };

const video = { id: 'PA9Q36PY5CU', title: 'African drums' };

export default function AfricanDrumsPage() {
  return (
    <main className="dest passport-page">
      <Link href="/" className="btn btn-back">← Back to map</Link>
      <h1>African drums</h1>
      <section className="card look-first">
        <SectionLabel>Watch</SectionLabel>
        <VideoSlot video={video} />
      </section>
    </main>
  );
}
