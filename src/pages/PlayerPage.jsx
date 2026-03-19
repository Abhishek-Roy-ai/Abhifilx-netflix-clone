import { useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import VideoPlayer from '../components/player/VideoPlayer'

export default function PlayerPage() {
  const { movieId } = useParams()

  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main className="px-4 pb-16 pt-6 md:px-10">
        <h1 className="text-xl font-semibold">Player</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Demo player screen for TMDB item id: <span className="text-white">{movieId}</span>
        </p>
        <div className="mt-6">
          <VideoPlayer />
        </div>
      </main>
    </div>
  )
}

