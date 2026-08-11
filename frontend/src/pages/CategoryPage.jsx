import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCatalog } from '../store/mediaSlice'
import Navbar from '../components/common/Navbar'
import MovieRow from '../components/movie/MovieRow'
import DetailModal from '../components/movie/DetailModal'
import Footer from '../components/common/Footer'
import Hero from '../components/hero/Hero'

const GENRES = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller']

export default function CategoryPage({ type = 'movie', title = 'Movies' }) {
  const dispatch = useDispatch()
  const [selectedGenre, setSelectedGenre] = useState('All')

  const { movies, tv, originals } = useSelector((state) => state.media)

  useEffect(() => {
    dispatch(fetchCatalog())
  }, [dispatch])

  const rawList = type === 'tv' ? tv : movies
  const filteredList =
    selectedGenre === 'All'
      ? rawList
      : rawList.filter((m) => m.genres && m.genres.includes(selectedGenre))

  const heroItem = filteredList[0] || originals[0]

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-between select-none">
      <div>
        <Navbar />

        {/* Hero & Category Filter Bar */}
        <div className="relative pt-20 px-4 md:px-12 flex items-center space-x-6 z-30">
          <h1 className="text-3xl md:text-5xl font-black">{title}</h1>

          {/* Genre Selector */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-black/80 text-white border border-gray-700 rounded px-3 py-1 text-xs md:text-sm font-semibold focus:outline-none focus:border-white transition"
            >
              {GENRES.map((g) => (
                <option key={g} value={g} className="bg-gray-900 text-white">
                  {g} Genre
                </option>
              ))}
            </select>
          </div>
        </div>

        <main className="pb-16 mt-4">
          {heroItem && <Hero media={heroItem} />}

          <MovieRow
            title={selectedGenre === 'All' ? `Popular ${title}` : `${selectedGenre} ${title}`}
            items={filteredList}
          />

          <MovieRow
            title={`Top Rated in ${title}`}
            items={filteredList.slice().reverse()}
          />
        </main>
      </div>

      <DetailModal />
      <Footer />
    </div>
  )
}
