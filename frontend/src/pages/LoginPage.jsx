import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearAuthError } from '../store/authSlice'
import { Film, Lock, Mail, ArrowRight } from 'lucide-react'

export default function LoginPage() {
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
      dispatch(loginUser({ email, password }))
    }
  }

  const fillDemoAccount = () => {
    setEmail('user@netflix.com')
    setPassword('Password123!')
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

      {/* Top Header */}
      <header className="relative z-10 px-6 py-6 md:px-12 flex items-center justify-between">
        <Link to="/login" className="text-3xl md:text-4xl font-black text-[#E50914] uppercase tracking-tighter">
          ABHIFLIX
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-black/75 backdrop-blur-md p-8 md:p-12 rounded-lg border border-gray-800 shadow-2xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-wide">Sign In</h1>
            <p className="text-xs text-gray-400">Production-ready Full Stack Authentication</p>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-600 text-red-200 text-xs p-3 rounded font-medium">
              {error}
            </div>
          )}

          {/* Quick Demo Fill Banner */}
          <div className="bg-gray-800/80 border border-gray-700 p-3 rounded flex items-center justify-between">
            <div className="text-xs">
              <span className="text-gray-400 block">Want a quick test drive?</span>
              <span className="text-white font-mono text-[11px]">user@netflix.com</span>
            </div>
            <button
              type="button"
              onClick={fillDemoAccount}
              className="text-xs bg-[#E50914] hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded transition"
            >
              Auto Fill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
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
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800/90 border border-gray-700 rounded px-10 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#E50914] hover:bg-red-700 active:scale-[0.99] text-white font-bold py-3 rounded transition shadow-lg flex items-center justify-center space-x-2"
            >
              <span>{status === 'loading' ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-gray-800 border-gray-700 text-red-600 focus:ring-0" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">Need help?</a>
          </div>

          <div className="pt-4 border-t border-gray-800 text-sm text-gray-400">
            New to Netflix?{' '}
            <Link to="/signup" className="text-white hover:underline font-semibold ml-1">
              Sign up now.
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs text-gray-500">
        This is a full-stack Netflix demonstration app.
      </footer>
    </div>
  )
}
