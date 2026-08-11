import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyList } from '../store/listSlice'
import Navbar from '../components/common/Navbar'
import MovieCard from '../components/movie/MovieCard'
import DetailModal from '../components/movie/DetailModal'
import Footer from '../components/common/Footer'
import { Bookmark } from 'lucide-react'

export default function MyListPage() {
  const dispatch = useDispatch()
  const { currentProfile } = useSelector((state) => state.auth)
  const myListItems = useSelector((state) => state.list.items)

  useEffect(() => {
    if (currentProfile?.id) {
      dispatch(fetchMyList(currentProfile.id))
    }
  }, [currentProfile, dispatch])

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-between select-none">
      <div>
        <Navbar />
        <main className="pt-28 px-4 md:px-12 pb-16">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 tracking-wide">
            My List ({myListItems.length})
          </h1>

          {myListItems.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="p-4 bg-gray-900 rounded-full text-gray-500">
                <Bookmark className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-gray-300">Your list is empty</h2>
              <p className="text-xs text-gray-500 max-w-sm">
                Explore movies and TV shows to add titles to your list so you can easily watch them later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {myListItems.map((item) => (
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
