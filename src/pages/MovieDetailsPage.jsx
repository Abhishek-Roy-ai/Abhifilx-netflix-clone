import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { tmdb } from '../services/tmdb'
import { imageUrl } from '../utils/tmdbImages'

function MovieDetailsInner({ movieId }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    tmdb
      .getMovieDetails(movieId)
      .then((d) => {
        if (!alive) return
        setData(d)
      })
      .catch((e) => {
        if (!alive) return
        setError(e?.message ?? 'Failed to load details')
      })
    return () => {
      alive = false
    }
  }, [movieId])

  const status = error ? 'failed' : data ? 'succeeded' : 'loading'
  const poster = data?.poster_path ? imageUrl(data.poster_path, 'w500') : null
  const backdrop = data?.backdrop_path ? imageUrl(data.backdrop_path, 'w1280') : null

  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main className="px-4 pb-16 pt-6 md:px-10">
        <Link className="text-sm text-[var(--text-secondary)] hover:text-white" to="/">
          ← Back
        </Link>

        {status === 'loading' && (
          <div className="mt-6 text-[var(--text-secondary)]">Loading details…</div>
        )}
        {status === 'failed' && (
          <div className="mt-6 text-[var(--netflix-red)]">{error}</div>
        )}

        {status === 'succeeded' && data && (
          <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
            <div className="overflow-hidden rounded-lg bg-[var(--dark-gray)]">
              {poster ? (
                <img alt={data.title ?? data.name ?? 'Poster'} src={poster} />
              ) : (
                <div className="aspect-[2/3] w-full bg-[var(--medium-gray)]" />
              )}
            </div>

            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">
                {data.title ?? data.name}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                {data.overview || 'No overview provided by TMDB.'}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center rounded bg-[var(--netflix-red)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                  to={`/player/${movieId}`}
                >
                  Play
                </Link>
              </div>

              {backdrop && (
                <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
                  <img alt="Backdrop" src={backdrop} className="w-full" />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  return <MovieDetailsInner key={movieId} movieId={movieId} />
}

