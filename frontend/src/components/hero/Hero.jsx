import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Play, Info, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { openDetailModal } from '../../store/mediaSlice'

export default function Hero({ media }) {
  const [isMuted, setIsMuted] = useState(true)
  const [heroImg, setHeroImg] = useState(media?.backdropUrl)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!media) {
    return (
      <div className="h-[75vh] bg-gradient-to-r from-gray-900 via-gray-800 to-black animate-pulse flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading featured title...</div>
      </div>
    )
  }

  const handlePlay = () => {
    navigate(`/watch/${media.id}`)
  }

  const handleMoreInfo = () => {
    dispatch(openDetailModal(media))
  }

  const handleImageError = () => {
    setHeroImg('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop')
  }

  return (
    <div className="relative h-[80vh] md:h-[88vh] w-full text-white overflow-hidden bg-black select-none">
      {/* Background Image / Video Backdrop */}
      <div className="absolute inset-0">
        <img
          src={heroImg || media.backdropUrl}
          alt={media.title}
          onError={handleImageError}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Gradient overlays for true Netflix aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
      </div>

      {/* Hero Content Box */}
      <div className="absolute bottom-16 md:bottom-24 left-4 md:left-12 max-w-2xl space-y-4 z-20">
        {/* Badge */}
        {media.isOriginal && (
          <div className="flex items-center space-x-2 text-[#E50914] text-xs md:text-sm font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>A B H I F L I X &nbsp; O R I G I N A L</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          {media.title}
        </h1>

        {/* Metadata row */}
        <div className="flex items-center space-x-3 text-xs md:text-sm font-semibold text-gray-300">
          <span className="text-emerald-400 font-bold">{media.matchScore || 98}% Match</span>
          <span className="border border-gray-600 px-1.5 py-0.5 rounded text-[11px]">{media.rating}</span>
          <span>{media.duration}</span>
          <div className="flex items-center space-x-1 text-gray-400">
            {media.genres?.slice(0, 3).map((g, idx) => (
              <span key={g}>
                {g}{idx < (media.genres.length - 1) && idx < 2 ? ' •' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <p className="text-gray-200 text-sm md:text-base line-clamp-3 leading-relaxed drop-shadow">
          {media.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-2">
          <button
            onClick={handlePlay}
            className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-white/80 active:scale-95 transition shadow-lg"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Play</span>
          </button>

          <button
            onClick={handleMoreInfo}
            className="flex items-center space-x-2 bg-gray-600/70 text-white px-6 py-2.5 rounded font-bold hover:bg-gray-600/50 backdrop-blur active:scale-95 transition"
          >
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Mute/Unmute Audio Toggle (Right Side) */}
      <div className="absolute bottom-20 right-6 md:right-12 z-20 flex items-center space-x-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full border border-gray-500/60 bg-black/40 hover:bg-black/70 backdrop-blur text-white transition focus:outline-none"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <div className="hidden md:block bg-gray-800/80 border-l-2 border-red-600 px-3 py-1 text-xs font-bold text-gray-200">
          {media.rating}
        </div>
      </div>
    </div>
  )
}
