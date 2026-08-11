import { Link } from 'react-router-dom'

export default function ProfileCard() {
  return (
    <div className="max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold">Abhishek</div>
          <div className="mt-1 text-sm text-[var(--text-secondary)]">
            Demo profile card
          </div>
        </div>
        <div className="h-12 w-12 rounded bg-[var(--netflix-red)]" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded border border-white/10 bg-black/30 p-3">
          <div className="text-xs text-[var(--text-secondary)]">Plan</div>
          <div className="mt-1 font-semibold">Premium</div>
        </div>
        <div className="rounded border border-white/10 bg-black/30 p-3">
          <div className="text-xs text-[var(--text-secondary)]">Profiles</div>
          <div className="mt-1 font-semibold">1</div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

