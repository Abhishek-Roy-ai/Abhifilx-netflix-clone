import { Link } from 'react-router-dom'
import { imageUrl } from '../../utils/tmdbImages'

export default function MovieCard({ item }) {
  const title = item.title ?? item.name ?? 'Untitled'
  const poster = item.poster_path ? imageUrl(item.poster_path, 'w342') : null

  return (
    <Link
      to={`/movie/${item.id}`}
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-[var(--dark-gray)]">
        {poster ? (
          <img
            alt={title}
            src={poster}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-secondary)]">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="line-clamp-1 text-sm font-semibold">{title}</div>
        <div className="mt-1 text-xs text-[var(--text-secondary)]">
          {item.media_type === 'tv' ? 'TV' : 'Movie'} • {Math.round((item.vote_average ?? 0) * 10) / 10}
        </div>
      </div>
    </Link>
  )
}

