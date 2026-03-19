import { useEffect } from 'react'
import { fetchTrending } from '../store/moviesSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import Navbar from '../components/common/Navbar'
import Hero from '../components/hero/Hero'
import MovieRow from '../components/movie/MovieRow'
import Footer from '../components/common/Footer'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { trending, status, error } = useAppSelector((s) => s.movies)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTrending())
  }, [dispatch, status])

  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <Hero />
        <section className="px-4 pb-14 md:px-10">
          <MovieRow
            title="Trending this week"
            items={trending}
            loading={status === 'loading'}
            error={error}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}

