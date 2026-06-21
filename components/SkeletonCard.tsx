export default function SkeletonCard() {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-[#1E1E2A]">
      <div className="aspect-[2/3] bg-ghost animate-shimmer" style={{
        background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
        backgroundSize: '800px 100%',
      }} />
      <div className="px-3 py-2.5">
        <div className="h-3 bg-ghost rounded w-3/4 mt-3 mx-3 animate-shimmer" style={{
          background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
          backgroundSize: '800px 100%',
        }} />
        <div className="h-2.5 bg-ghost rounded w-1/2 mt-1.5 mx-3 mb-3 animate-shimmer" style={{
          background: 'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
          backgroundSize: '800px 100%',
        }} />
      </div>
    </div>
  );
}
