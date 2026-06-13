// Route transition wrapper — re-mounts on every navigation so the
// rise-and-fade entrance runs both ways (map → destination → map).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
