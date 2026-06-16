import Link from 'next/link';
import VideoSlot from '@/components/VideoSlot';
import SectionLabel from '@/components/SectionLabel';

export const metadata = { title: 'Your Passport — Maths Around Our World' };

// How-to-make-your-passport video, hosted on Google Drive. As with the Europe
// video, the Drive file's sharing must stay "Anyone with the link → Viewer"
// or it won't play in class.
const passportVideo = {
  driveId: '1NM5FdI5PnybtKUaEUeI7ZrNgdxnuwWpQ',
  title: 'How to make your passport',
};

export default function PassportPage() {
  return (
    <main className="dest passport-page">
      <Link href="/" className="btn btn-back">← Back to map</Link>
      <h1>Make your passport</h1>
      <p className="passport-intro">
        Watch this short video to see how to make your 2026 Midwinter Maths Festival passport.
        Then take it travelling — collect a stamp at every destination you visit on the map.
      </p>
      <section className="card look-first">
        <SectionLabel>Watch</SectionLabel>
        <VideoSlot video={passportVideo} />
      </section>
    </main>
  );
}
