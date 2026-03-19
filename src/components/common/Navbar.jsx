import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Z"
        fill="currentColor"
      />
      <path
        d="M18 16V11a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/tv', label: 'TV Shows' },
  { to: '/movies', label: 'Movies' },
  { to: '/new', label: 'New & Popular' },
  { to: '/my-list', label: 'My List' },
]

const linkBase =
  'text-sm font-medium transition-colors hover:text-white'

export default function Navbar() {
  const { user, isAuthed, logout } = useAuth()
  const nav = useNavigate()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSolid((window.scrollY || 0) > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDown = (e) => {
      if (!open) return
      if (!menuRef.current) return
      if (menuRef.current.contains(e.target)) return
      setOpen(false)
    }
    window.addEventListener('pointerdown', onDown)
    return () => window.removeEventListener('pointerdown', onDown)
  }, [open])

  const avatarLetter = useMemo(() => {
    const n = user?.name?.trim()
    return n ? n[0].toUpperCase() : 'U'
  }, [user?.name])

  const onLogout = () => {
    setOpen(false)
    logout()
    nav('/')
  }

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-colors duration-300',
        solid ? 'bg-black/95' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-10">
        <div className="flex items-center gap-7">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/netflix_logo.png" alt="Netflix" className="h-7 w-auto" />
          </NavLink>

          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-white/10"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5 text-white" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-white/10"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5 text-white" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="ml-1 inline-flex items-center gap-2 rounded px-1 py-1 hover:bg-white/10"
              aria-label="Profile menu"
              aria-expanded={open}
            >
              <div className="grid h-8 w-8 place-items-center rounded bg-[var(--netflix-red)] text-xs font-bold">
                {avatarLetter}
              </div>
              <svg
                className="h-4 w-4 text-white/80"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-md border border-white/10 bg-black/95 text-sm shadow-2xl">
                {isAuthed ? (
                  <>
                    <NavLink
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 hover:bg-white/10"
                    >
                      Account
                      <div className="text-xs text-[var(--text-secondary)]">{user?.email}</div>
                    </NavLink>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="block w-full px-4 py-3 text-left hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      state={{ from: window.location.pathname }}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 hover:bg-white/10"
                    >
                      Sign in
                    </NavLink>
                    <NavLink
                      to="/signup"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 hover:bg-white/10"
                    >
                      Sign up
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

