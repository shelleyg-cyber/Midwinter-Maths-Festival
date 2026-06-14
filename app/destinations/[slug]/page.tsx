import Link from 'next/link';
import { notFound } from 'next/navigation';
import { destinations, ASSETS } from '@/lib/destinations';
import ChallengeCard from '@/components/ChallengeCard';
import SectionLabel from '@/components/SectionLabel';
import VideoSlot from '@/components/VideoSlot';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  return { title: d ? `${d.name} — Maths Around Our World` : 'Maths Around Our World' };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) notFound();

  return (
    <div className="dest dest-rail" style={{ '--accent': d.accent } as React.CSSProperties}>
      <aside className="rail">
        <Link href="/" className="btn btn-back">← Back to map</Link>
        {d.banner ? (
          <header
            className="rail-banner"
            style={{ backgroundImage: `url(${ASSETS}banners/${d.banner})` }}
          >
            <span className="dest-num">Destination {d.num}</span>
            <div className="rail-banner-text">
              <h1>{d.name}</h1>
              <p className="dest-sub">{d.subtitle}</p>
            </div>
          </header>
        ) : (
          <>
            <span className="dest-num">Destination {d.num}</span>
            <h1>{d.name}</h1>
            <p className="dest-sub">{d.subtitle}</p>
            <div className="rail-illus" role="img" aria-label="Illustration placeholder">
              poster-style illustration<br />to be added
            </div>
          </>
        )}
        <div className="rail-dyk">
          <SectionLabel>Did you know?</SectionLabel>
          <p>{d.didYouKnow}</p>
        </div>
        {d.outstanding && d.outstanding.length > 0 && (
          <div className="flags" title="Outstanding assets noted in the planning document">
            {d.outstanding.map((f, i) => (
              <div key={i} className="flag-note">⚑ {f}</div>
            ))}
          </div>
        )}
      </aside>
      <div className="rail-main">
        <section className="card look-first">
          <SectionLabel>Watch / Look first</SectionLabel>
          <VideoSlot video={d.video} />
          {d.audio && (
            <figure className="maw-audio">
              {d.audio.title && <figcaption>{d.audio.title}</figcaption>}
              <audio controls preload="none" src={ASSETS + d.audio.src}>
                Your browser does not support the audio element.
              </audio>
            </figure>
          )}
          {d.image && (
            <figure className="maw-fig">
              <img src={ASSETS + d.image} alt={d.imageAlt || ''} />
            </figure>
          )}
        </section>
        <div className="rail-challenges">
          {d.challenges.map((ch) => (
            <ChallengeCard
              key={ch.level}
              level={ch.level}
              body={ch.body}
              options={ch.options}
              correct={ch.correct}
              aside={ch.aside}
              hint={ch.hint}
              answer={ch.answer}
              open={ch.open}
              accent={d.accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
