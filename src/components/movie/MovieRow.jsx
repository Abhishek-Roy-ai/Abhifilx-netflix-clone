import MovieCard from './MovieCard'

export default function MovieRow({ title, items, loading, error }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        {loading && (
          <span className="text-xs text-[var(--text-secondary)]">Loading…</span>
        )}
      </div>

      {error && <div className="mt-3 text-sm text-[var(--netflix-red)]">{error}</div>}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {items?.slice(0, 18)?.map((m) => (
          <MovieCard key={`${m.media_type}-${m.id}`} item={m} />
        ))}
        {!loading && (!items || items.length === 0) && (
          <div className="col-span-full rounded border border-white/10 bg-white/5 p-4 text-sm text-[var(--text-secondary)]">
            No results. Add your TMDB key in <span className="text-white">.env</span>.
          </div>
        )}
      </div>
    </div>
  )
}

