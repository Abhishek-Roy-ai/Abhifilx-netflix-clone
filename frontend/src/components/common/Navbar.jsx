import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Search, Bell, ChevronDown, User, LogOut, Film } from 'lucide-react'
import { logout, selectProfile } from '../../store/authSlice'
import { setSearchQuery } from '../../store/mediaSlice'
import { getProfileAvatar } from '../../utils/avatars'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [profileDropdown, setProfileDropdown] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { user, profiles, currentProfile } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput.trim()))
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchInput(val)
    dispatch(setSearchQuery(val))
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`)
    }
  }

  const handleSignOut = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#141414] shadow-xl shadow-black/80' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-12 md:py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-6 md:space-x-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#E50914] uppercase">
              ABHIFLIX
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-5 text-sm text-gray-300 font-medium">
            <Link to="/" className={`hover:text-white transition ${location.pathname === '/' ? 'text-white font-bold' : ''}`}>
              Home
            </Link>
            <Link to="/tv" className={`hover:text-white transition ${location.pathname === '/tv' ? 'text-white font-bold' : ''}`}>
              TV Shows
            </Link>
            <Link to="/movies" className={`hover:text-white transition ${location.pathname === '/movies' ? 'text-white font-bold' : ''}`}>
              Movies
            </Link>
            <Link to="/my-list" className={`hover:text-white transition ${location.pathname === '/my-list' ? 'text-white font-bold' : ''}`}>
              My List
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Expandable Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-gray-200 hover:text-white transition focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Titles, people, genres..."
              value={searchInput}
              onChange={handleSearchChange}
              className={`bg-black/70 border border-gray-600 text-white text-xs md:text-sm rounded px-3 py-1.5 focus:outline-none focus:border-white transition-all duration-300 ${
                searchOpen ? 'w-44 md:w-64 opacity-100 ml-2' : 'w-0 opacity-0 p-0 border-none pointer-events-none'
              }`}
            />
          </form>

          {/* Notifications */}
          <button className="text-gray-300 hover:text-white transition p-1" aria-label="Notifications">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdown(!profileDropdown)}
              className="flex items-center space-x-1.5 focus:outline-none group"
            >
              <img
                src={getProfileAvatar(currentProfile)}
                alt={currentProfile?.name || 'Profile'}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = getProfileAvatar(currentProfile)
                }}
                className="w-8 h-8 rounded border border-transparent group-hover:border-white transition"
              />
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdown && (
              <div
                className="absolute right-0 mt-3 w-56 bg-[#181818] border border-gray-800 rounded shadow-xl py-2 z-50 text-xs md:text-sm text-gray-200"
                onMouseLeave={() => setProfileDropdown(false)}
              >
                <div className="px-4 py-2 border-b border-gray-800 flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#E50914]" />
                  <span className="font-semibold truncate text-white">{user?.email}</span>
                </div>

                <div className="py-1">
                  <div className="px-4 py-1.5 text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                    Switch Profile
                  </div>
                  {profiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        dispatch(selectProfile(p))
                        setProfileDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-gray-800 transition ${
                        currentProfile?.id === p.id ? 'bg-gray-800/60 text-white font-bold' : ''
                      }`}
                    >
                      <img src={getProfileAvatar(p)} alt={p.name} className="w-6 h-6 rounded" />
                      <span className="truncate">{p.name}</span>
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setProfileDropdown(false)
                      navigate('/profiles')
                    }}
                    className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition flex items-center space-x-2 mt-1 border-t border-gray-800"
                  >
                    <User className="w-4 h-4" />
                    <span>Manage Profiles</span>
                  </button>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800 hover:text-red-400 transition border-t border-gray-800 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out of Abhiflix</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
