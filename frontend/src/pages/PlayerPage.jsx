import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import VideoPlayer from '../components/player/VideoPlayer'

export default function PlayerPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function loadMedia() {
      try {
        setLoading(true)
        const res = await api.get(`/media/${movieId}`)
        if (isMounted) {
          setMedia(res.media)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    loadMedia()
    return () => {
      isMounted = false
    }
  }, [movieId])

  if (loading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold tracking-wide text-gray-400">Loading Abhiflix Stream...</p>
        </div>
      </div>
    )
  }

  if (error || !media) {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Video Unavailable</h2>
        <p className="text-sm text-gray-400">{error || 'Could not load media file'}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition"
        >
          Go Back Home
        </button>
      </div>
    )
  }

  return <VideoPlayer media={media} />
}
