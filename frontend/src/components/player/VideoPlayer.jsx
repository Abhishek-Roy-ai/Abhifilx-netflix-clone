import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Film
} from 'lucide-react'
import { updateWatchProgress } from '../../store/watchSlice'

export default function VideoPlayer({ media }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const videoRef = useRef(null)
  const containerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const { currentProfile } = useSelector((state) => state.auth)
  const controlsTimeoutRef = useRef(null)

  const videoSource = media?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3500)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying])

  // Sync watch progress to backend every 5 seconds
  useEffect(() => {
    if (!currentProfile || !media?.id) return
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        const cur = Math.floor(videoRef.current.currentTime)
        const dur = Math.floor(videoRef.current.duration || 100)
        if (cur > 0) {
          dispatch(
            updateWatchProgress({
              profileId: currentProfile.id,
              mediaId: media.id,
              progressSeconds: cur,
              totalSeconds: dur
            })
          )
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentProfile, media, dispatch])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const time = Number(e.target.value)
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value)
    setVolume(val)
    if (videoRef.current) {
      videoRef.current.volume = val
      setIsMuted(val === 0)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    if (isMuted) {
      videoRef.current.muted = false
      setIsMuted(false)
    } else {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  const skipSeconds = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.error)
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(console.error)
      setIsFullscreen(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* HTML5 Video Player Element */}
      <video
        ref={videoRef}
        src={videoSource}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Overlay Controls */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 flex flex-col justify-between p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-black/40 hover:bg-black/80 rounded-full text-white transition focus:outline-none"
            aria-label="Back"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">{media?.title || 'Watching Netflix'}</h2>
            <p className="text-xs text-gray-400 font-semibold">{media?.rating || 'HD'} • {media?.type === 'series' ? 'S1 : E1' : 'Feature Film'}</p>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="space-y-3">
          {/* Seek Slider */}
          <div className="flex items-center space-x-3 text-xs text-gray-300 font-semibold">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#E50914] focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="p-2 text-white hover:text-red-500 transition focus:outline-none">
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current" />}
              </button>

              <button onClick={() => skipSeconds(-10)} className="p-2 text-gray-300 hover:text-white transition focus:outline-none" title="Rewind 10s">
                <RotateCcw className="w-6 h-6" />
              </button>

              <button onClick={() => skipSeconds(10)} className="p-2 text-gray-300 hover:text-white transition focus:outline-none" title="Forward 10s">
                <RotateCw className="w-6 h-6" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="p-2 text-gray-300 hover:text-white transition focus:outline-none">
                  {isMuted || volume === 0 ? <VolumeX className="w-6 h-6 text-red-500" /> : <Volume2 className="w-6 h-6" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-700 rounded appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-gray-400 border border-gray-600 px-2 py-0.5 rounded uppercase">
                {media?.type || 'Movie'}
              </span>
              <button onClick={toggleFullscreen} className="p-2 text-gray-300 hover:text-white transition focus:outline-none">
                {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
