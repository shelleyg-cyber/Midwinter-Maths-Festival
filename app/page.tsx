import MapButtons from '@/components/MapButtons';
import { ASSETS } from '@/lib/destinations';

export default function MapPage() {
  return (
    <main className="map-stage">
      <div className="map-box">
        <img
          className="map-art"
          src={`${ASSETS}world-map.png`}
          alt="Watercolour world map — 2026 Midwinter Maths Festival"
        />
        <MapButtons />
      </div>
      <p className="map-tagline">Choose a destination to begin your journey</p>
    </main>
  );
}
