import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearAuthError } from '../store/authSlice'
import { User, Lock, Mail, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, error, token } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearAuthError())
    if (token) {
      navigate('/profiles')
    }
  }, [token, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      dispatch(registerUser({ name, email, password }))
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col justify-between overflow-hidden select-none">
      {/* Background Poster Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-b47e-077a8404474d/56707ef3-2f42-40d5-a379-6cd54d5d404c/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Netflix Background"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      <header className="relative z-10 px-6 py-6 md:px-12 flex items-center justify-between">
        <Link to="/login" className="text-3xl md:text-4xl font-black text-[#E50914] uppercase tracking-tighter">
          ABHIFLIX
        </Link>
        <Link to="/login" className="text-sm font-semibold text-white hover:underline">
          Sign In
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-black/75 backdrop-blur-md p-8 md:p-12 rounded-lg border border-gray-800 shadow-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-wide">Unlimited movies, TV shows, and more</h1>
            <p className="text-xs text-gray-400">Create your account to start watching today.</p>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-600 text-red-200 text-xs p-3 rounded font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Profile Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800/90 border border-gray-700 rounded px-10 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800/90 border border-gray-700 rounded px-10 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800/90 border border-gray-700 rounded px-10 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#E50914] hover:bg-red-700 active:scale-[0.99] text-white font-bold py-3 rounded transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>{status === 'loading' ? 'Creating Account...' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-gray-800 text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline font-semibold ml-1">
              Sign in now.
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Netflix Clone Demo.
      </footer>
    </div>
  )
}
