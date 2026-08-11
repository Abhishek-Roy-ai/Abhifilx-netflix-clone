import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchCatalog } from '../store/mediaSlice'
import Navbar from '../components/common/Navbar'
import MovieCard from '../components/movie/MovieCard'
import DetailModal from '../components/movie/DetailModal'
import Footer from '../components/common/Footer'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const dispatch = useDispatch()

  const { searchResults } = useSelector((state) => state.media)

  useEffect(() => {
    if (query) {
      dispatch(searchCatalog(query))
    }
  }, [query, dispatch])

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-between select-none">
      <div>
        <Navbar />
        <main className="pt-28 px-4 md:px-12 pb-16">
          <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-300">
            Results for <span className="text-white font-black">"{query}"</span>
          </h1>

          {searchResults.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-gray-400 text-base md:text-lg">
                Your search for "{query}" did not have any matches.
              </p>
              <p className="text-xs text-gray-500">
                Suggestions: Try different keywords, movie titles, or actor names.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {searchResults.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>

      <DetailModal />
      <Footer />
    </div>
  )
}
