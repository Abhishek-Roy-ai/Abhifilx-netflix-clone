import Navbar from '../components/common/Navbar'
import ProfileCard from '../components/profile/ProfileCard'

export default function ProfilePage() {
  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main className="px-4 pb-16 pt-6 md:px-10">
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Demo profile screen (you can expand this later).
        </p>
        <div className="mt-6">
          <ProfileCard />
        </div>
      </main>
    </div>
  )
}

