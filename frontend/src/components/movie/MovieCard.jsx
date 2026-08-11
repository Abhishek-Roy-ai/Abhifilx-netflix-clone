import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Play, Plus, Check, ChevronDown } from 'lucide-react'
import { openDetailModal } from '../../store/mediaSlice'
import { toggleMyList } from '../../store/listSlice'

export default function MovieCard({ item, isTop10Index = null }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { currentProfile } = useSelector((state) => state.auth)
  const myListItems = useSelector((state) => state.list.items)

  const initialSrc = item.posterUrl || item.backdropUrl
  const [imgSrc, setImgSrc] = useState(initialSrc)
  const [imgError, setImgError] = useState(false)

  const isBookmarked = myListItems.some((i) => i.id === item.id)

  const handlePlay = (e) => {
    e.stopPropagation()
    navigate(`/watch/${item.id}`)
  }

  const handleToggleList = (e) => {
    e.stopPropagation()
    if (currentProfile) {
      dispatch(toggleMyList({ profileId: currentProfile.id, media: item }))
    }
  }

  const handleOpenDetails = () => {
    dispatch(openDetailModal(item))
  }

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true)
      if (item.backdropUrl && imgSrc !== item.backdropUrl) {
        setImgSrc(item.backdropUrl)
      } else {
        setImgSrc(`https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=600&auto=format&fit=crop`)
      }
    }
  }

  return (
    <div
      onClick={handleOpenDetails}
      className="group relative flex-shrink-0 cursor-pointer transition-all duration-300 transform hover:z-50 hover:scale-115 hover:-translate-y-2"
    >
      {/* Top 10 Number Display */}
      {isTop10Index !== null ? (
        <div className="flex items-center">
          <span className="text-7xl md:text-9xl font-black tracking-tighter text-transparent stroke-white select-none pr-1 drop-shadow-xl text-stroke">
            {isTop10Index + 1}
          </span>
          <div className="w-28 md:w-36 aspect-[2/3] rounded-md overflow-hidden shadow-xl bg-gray-900 border border-gray-800 group-hover:border-gray-500 group-hover:shadow-2xl group-hover:shadow-red-950/40 relative transition-all">
            <img
              src={imgSrc}
              alt={item.title}
              onError={handleImageError}
              className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
              loading="lazy"
            />
            {imgError && (
              <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black p-2 flex items-end justify-center">
                <span className="text-xs font-bold text-red-500 text-center">{item.title}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-36 md:w-48 aspect-[2/3] md:aspect-video rounded-md overflow-hidden shadow-lg bg-gray-900 border border-gray-800 group-hover:border-gray-500 group-hover:shadow-2xl group-hover:shadow-red-950/40 relative transition-all">
          <img
            src={imgSrc}
            alt={item.title}
            onError={handleImageError}
            className="w-full h-full object-cover transition duration-300 group-hover:brightness-110"
            loading="lazy"
          />
          {imgError && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black p-2 flex items-end justify-center">
              <span className="text-xs font-bold text-red-500 text-center">{item.title}</span>
            </div>
          )}
        </div>
      )}

      {/* Hover Card Overlay - Pops out smoothly with action buttons */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-black/80 to-transparent p-3.5 rounded-md flex flex-col justify-end shadow-2xl border border-gray-700/80">
        <h4 className="text-xs md:text-sm font-bold text-white truncate drop-shadow">{item.title}</h4>

        <div className="flex items-center space-x-2 my-1.5 text-[11px] text-gray-300 font-semibold">
          <span className="text-emerald-400 font-bold">{item.matchScore || 98}%</span>
          <span className="border border-gray-500 px-1 py-0.2 rounded text-[9px]">{item.rating || 'TV-MA'}</span>
          <span>{item.duration || '2h'}</span>
        </div>

        {/* Quick Action Icons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlay}
              className="p-2 bg-white text-black rounded-full hover:bg-white/80 transition transform active:scale-90 shadow-md"
              title="Play"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={handleToggleList}
              className="p-2 border border-gray-400 rounded-full hover:border-white bg-black/60 text-white transition transform active:scale-90"
              title={isBookmarked ? 'Remove from My List' : 'Add to My List'}
            >
              {isBookmarked ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={handleOpenDetails}
            className="p-2 border border-gray-400 rounded-full hover:border-white bg-black/60 text-white transition transform active:scale-90"
            title="More Info"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
