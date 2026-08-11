import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCatalog } from '../store/mediaSlice'
import { fetchMyList } from '../store/listSlice'
import { fetchContinueWatching } from '../store/watchSlice'
import Navbar from '../components/common/Navbar'
import Hero from '../components/hero/Hero'
import MovieRow from '../components/movie/MovieRow'
import DetailModal from '../components/movie/DetailModal'
import Footer from '../components/common/Footer'

export default function HomePage() {
  const dispatch = useDispatch()

  const { hero, trending, originals, top10, movies, tv, status } = useSelector((state) => state.media)
  const { currentProfile } = useSelector((state) => state.auth)
  const { continueWatching } = useSelector((state) => state.watch)

  useEffect(() => {
    dispatch(fetchCatalog())
  }, [dispatch])

  useEffect(() => {
    if (currentProfile?.id) {
      dispatch(fetchMyList(currentProfile.id))
      dispatch(fetchContinueWatching(currentProfile.id))
    }
  }, [currentProfile, dispatch])

  const actionMovies = movies.filter((m) => m.genres?.includes('Action'))
  const sciFiMovies = movies.filter((m) => m.genres?.includes('Sci-Fi'))

  if (status === 'loading' && !hero) {
    return (
      <div className="w-screen h-screen bg-[#141414] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold tracking-wider text-gray-400">Loading Abhiflix...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-between select-none">
      <div>
        <Navbar />
        <main className="pb-16">
          {/* Main Hero Component */}
          <Hero media={hero} />

          {/* Continue Watching Row */}
          {continueWatching && continueWatching.length > 0 && (
            <MovieRow title={`Continue Watching for ${currentProfile?.name || 'User'}`} items={continueWatching} />
          )}

          {/* Trending Row */}
          <MovieRow title="Trending Now" items={trending} />

          {/* Top 10 Row */}
          <MovieRow title="Top 10 Movies & TV Shows Today" items={top10} isTop10={true} />

          {/* Abhiflix Originals */}
          <MovieRow title="Abhiflix Originals" items={originals} />

          {/* Action Movies */}
          <MovieRow title="Action & Thrillers" items={actionMovies.length > 0 ? actionMovies : movies} />

          {/* Sci-Fi Movies */}
          <MovieRow title="Sci-Fi & Fantasy" items={sciFiMovies.length > 0 ? sciFiMovies : tv} />
        </main>
      </div>

      <DetailModal />
      <Footer />
    </div>
  )
}
