import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { signIn } = useAuth()
  const nav = useNavigate()
  const loc = useLocation()

  const from = useMemo(() => loc.state?.from ?? '/', [loc.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      signIn({ email, password })
      nav(from, { replace: true })
    } catch (err) {
      setError(err?.message ?? 'Failed to sign in')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main className="mx-auto grid max-w-7xl px-4 pb-16 pt-10 md:px-10 md:pt-16">
        <div className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-black/70 p-6 backdrop-blur">
          <h1 className="text-2xl font-semibold">Sign In</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Demo auth. Your session is stored in localStorage.
          </p>

          {error && (
            <div className="mt-4 rounded border border-[var(--netflix-red)]/50 bg-[var(--netflix-red)]/10 p-3 text-sm text-white">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 grid gap-3">
            <label className="grid gap-2 text-sm">
              <span className="text-[var(--text-secondary)]">Email</span>
              <input
                className="rounded bg-white/10 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-[var(--netflix-red)]/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-[var(--text-secondary)]">Password</span>
              <input
                type="password"
                className="rounded bg-white/10 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-[var(--netflix-red)]/60"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            <button
              disabled={busy}
              className="mt-2 inline-flex items-center justify-center rounded bg-[var(--netflix-red)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
            >
              {busy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-sm text-[var(--text-secondary)]">
            New to Netflix?{' '}
            <Link className="text-white hover:underline" to="/signup">
              Sign up now
            </Link>
            .
          </div>
        </div>
      </main>
    </div>
  )
}

