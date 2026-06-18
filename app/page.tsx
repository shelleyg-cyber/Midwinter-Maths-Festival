import MapButtons from '@/components/MapButtons';
import PassportButton from '@/components/PassportButton';
import VideoTile from '@/components/VideoTile';
import { ASSETS } from '@/lib/destinations';

export default function MapPage() {
  return (
    <main className="map-stage">
      <div className="map-row">
        <div className="map-box">
          <img
            className="map-art"
            src={`${ASSETS}world-map.png`}
            alt="Watercolour world map — 2026 Midwinter Maths Festival"
          />
          <MapButtons />
        </div>
        <PassportButton />
        <div className="map-tiles">
          <VideoTile href="/tile-patterns" img="tile-motif.png" label="Tile patterns" />
          <VideoTile href="/african-drums" img="african-drum.png" label="African drums" />
        </div>
      </div>
      <p className="map-tagline">Choose a destination to begin your journey</p>
    </main>
  );
}
