export default function VideoSlot({ video }: { video: { id?: string; title?: string; note?: string } }) {
  if (video.id) {
    return (
      <div className="vslot">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title || 'Watch first'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  }
  return (
    <div className="vslot vslot-placeholder" role="img" aria-label="Video placeholder">
      <div className="vslot-badge">▷</div>
      <div className="vslot-note">video to be added</div>
      {video.note && <div className="vslot-sub">{video.note}</div>}
    </div>
  );
}
