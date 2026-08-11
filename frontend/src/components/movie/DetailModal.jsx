import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { X, Play, Plus, Check, ThumbsUp, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { closeDetailModal } from '../../store/mediaSlice'
import { toggleMyList } from '../../store/listSlice'

export default function DetailModal() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { activeMediaDetail, modalOpen, similarMedia } = useSelector((state) => state.media)
  const { currentProfile } = useSelector((state) => state.auth)
  const myListItems = useSelector((state) => state.list.items)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') dispatch(closeDetailModal())
    }
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalOpen, dispatch])

  if (!modalOpen || !activeMediaDetail) return null

  const isBookmarked = myListItems.some((i) => i.id === activeMediaDetail.id)

  const handlePlay = () => {
    dispatch(closeDetailModal())
    navigate(`/watch/${activeMediaDetail.id}`)
  }

  const handleToggleList = () => {
    if (currentProfile) {
      dispatch(toggleMyList({ profileId: currentProfile.id, media: activeMediaDetail }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl border border-gray-800 text-white my-auto max-h-[90vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeDetailModal())}
          className="absolute top-4 right-4 z-40 p-2 bg-[#181818]/80 hover:bg-white/20 rounded-full text-white transition focus:outline-none"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Media Hero Header */}
        <div className="relative aspect-video w-full bg-black">
          <img
            src={activeMediaDetail.backdropUrl || activeMediaDetail.posterUrl}
            alt={activeMediaDetail.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />

          {/* Action Overlay */}
          <div className="absolute bottom-6 left-6 md:left-10 space-y-3">
            <h2 className="text-3xl md:text-5xl font-black drop-shadow-md">{activeMediaDetail.title}</h2>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlay}
                className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-white/80 transition shadow-lg"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play</span>
              </button>

              <button
                onClick={handleToggleList}
                className="p-2.5 border border-gray-400 rounded-full hover:border-white bg-black/50 text-white transition"
                title={isBookmarked ? 'Remove from My List' : 'Add to My List'}
              >
                {isBookmarked ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
              </button>

              <button className="p-2.5 border border-gray-400 rounded-full hover:border-white bg-black/50 text-white transition">
                <ThumbsUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Metadata Body */}
        <div className="p-6 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left 2 Cols: Main Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-3 text-sm font-semibold text-gray-300">
                <span className="text-emerald-400 font-bold">{activeMediaDetail.matchScore || 98}% Match</span>
                <span>{activeMediaDetail.releaseYear}</span>
                <span className="border border-gray-600 px-1.5 py-0.5 rounded text-xs">{activeMediaDetail.rating}</span>
                <span>{activeMediaDetail.duration}</span>
              </div>

              <p className="text-gray-200 text-sm md:text-base leading-relaxed">{activeMediaDetail.description}</p>
            </div>

            {/* Right Col: Cast & Tags */}
            <div className="space-y-3 text-xs md:text-sm text-gray-400">
              {activeMediaDetail.cast && activeMediaDetail.cast.length > 0 && (
                <div>
                  <span className="text-gray-500 font-semibold">Cast: </span>
                  <span className="text-gray-200">{activeMediaDetail.cast.join(', ')}</span>
                </div>
              )}

              {activeMediaDetail.genres && activeMediaDetail.genres.length > 0 && (
                <div>
                  <span className="text-gray-500 font-semibold">Genres: </span>
                  <span className="text-gray-200">{activeMediaDetail.genres.join(', ')}</span>
                </div>
              )}

              {activeMediaDetail.tags && activeMediaDetail.tags.length > 0 && (
                <div>
                  <span className="text-gray-500 font-semibold">This show is: </span>
                  <span className="text-gray-200">{activeMediaDetail.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* More Like This / Similar recommendations */}
          {similarMedia && similarMedia.length > 0 && (
            <div className="pt-6 border-t border-gray-800 space-y-4">
              <h3 className="text-lg md:text-xl font-bold">More Like This</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {similarMedia.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => {
                      dispatch(closeDetailModal())
                      navigate(`/watch/${sim.id}`)
                    }}
                    className="bg-[#242424] rounded-lg overflow-hidden cursor-pointer group hover:bg-[#2e2e2e] transition"
                  >
                    <img src={sim.backdropUrl || sim.posterUrl} alt={sim.title} className="w-full aspect-video object-cover" />
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-emerald-400">{sim.matchScore || 95}% Match</span>
                        <span className="border border-gray-600 px-1 py-0.2 rounded text-[10px]">{sim.rating}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-red-500 transition">{sim.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2">{sim.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
