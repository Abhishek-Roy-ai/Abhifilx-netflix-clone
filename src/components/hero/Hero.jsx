import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-[var(--black)]" />
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.35),_transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 md:px-10 md:pb-16 md:pt-20">
        <p className="text-xs font-semibold tracking-widest text-[var(--text-secondary)]">
          NETFLIX CLONE
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
          Unlimited movies, TV shows, and more.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-secondary)] md:text-base">
          This is a frontend demo wired to TMDB via Axios, with routing and global state
          using Redux Toolkit.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="inline-flex items-center rounded bg-[var(--netflix-red)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            to="#"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex items-center rounded bg-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
            to="/profile"
          >
            View Profile
          </Link>
        </div>
      </div>
    </section>
  )
}

