export default function VideoSlot({
  video,
}: {
  video: { id?: string; driveId?: string; title?: string; note?: string };
}) {
  if (video.id || video.driveId) {
    const src = video.id
      ? `https://www.youtube-nocookie.com/embed/${video.id}`
      : `https://drive.google.com/file/d/${video.driveId}/preview`;
    return (
      <div className="vslot">
        <iframe
          src={src}
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
