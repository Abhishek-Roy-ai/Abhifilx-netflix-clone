import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main className="px-4 pb-16 pt-12 md:px-10">
        <h1 className="text-2xl font-semibold">This page is lost.</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          We can’t find what you’re looking for.
        </p>
        <Link
          className="mt-6 inline-flex rounded bg-[var(--netflix-red)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          to="/"
        >
          Go Home
        </Link>
      </main>
    </div>
  )
}

