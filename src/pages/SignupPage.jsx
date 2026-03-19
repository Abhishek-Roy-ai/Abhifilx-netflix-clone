import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { useAuth } from '../hooks/useAuth'

export default function SignupPage() {
  const { signUp } = useAuth()
  const nav = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      signUp({ name, email, password })
      nav('/', { replace: true })
    } catch (err) {
      setError(err?.message ?? 'Failed to sign up')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-dvh bg-[var(--black)] text-[var(--text-primary)]">
      <Navbar />
      <main className="mx-auto grid max-w-7xl px-4 pb-16 pt-10 md:px-10 md:pt-16">
        <div className="mx-auto w-full max-w-md rounded-xl border border-white/10 bg-black/70 p-6 backdrop-blur">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Create a demo account (stored locally).
          </p>

          {error && (
            <div className="mt-4 rounded border border-[var(--netflix-red)]/50 bg-[var(--netflix-red)]/10 p-3 text-sm text-white">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 grid gap-3">
            <label className="grid gap-2 text-sm">
              <span className="text-[var(--text-secondary)]">Name</span>
              <input
                className="rounded bg-white/10 px-3 py-2 text-white outline-none ring-1 ring-white/10 focus:ring-[var(--netflix-red)]/60"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>

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
                autoComplete="new-password"
                required
              />
            </label>

            <button
              disabled={busy}
              className="mt-2 inline-flex items-center justify-center rounded bg-[var(--netflix-red)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
            >
              {busy ? 'Creating…' : 'Create Account'}
            </button>
          </form>

          <div className="mt-5 text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link className="text-white hover:underline" to="/login">
              Sign in
            </Link>
            .
          </div>
        </div>
      </main>
    </div>
  )
}

