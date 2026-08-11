import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile, createProfile } from '../store/authSlice'
import { getProfileAvatar, KIDS_AVATAR, ADULT_AVATAR } from '../utils/avatars'
import { Plus, Edit, X } from 'lucide-react'

export default function ProfileSelectPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { profiles, currentProfile } = useSelector((state) => state.auth)

  const [showAddModal, setShowAddModal] = useState(false)
  const [newProfileName, setNewProfileName] = useState('')
  const [isKids, setIsKids] = useState(false)

  const handleSelect = (prof) => {
    dispatch(selectProfile(prof))
    navigate('/')
  }

  const handleCreateProfile = (e) => {
    e.preventDefault()
    if (newProfileName.trim()) {
      dispatch(createProfile({ name: newProfileName.trim(), isKids }))
      setNewProfileName('')
      setIsKids(false)
      setShowAddModal(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#141414] text-white flex flex-col items-center justify-center p-6 select-none animate-fade-in">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-medium tracking-wide">Who's watching?</h1>

        {/* Profiles Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-4">
          {profiles.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              className="group flex flex-col items-center space-y-3 cursor-pointer"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 transform group-hover:scale-105 shadow-xl bg-gray-800 relative">
                <img
                  src={getProfileAvatar(p)}
                  alt={p.name}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = p.isKids ? KIDS_AVATAR : ADULT_AVATAR
                  }}
                  className="w-full h-full object-cover"
                />
                {p.isKids && (
                  <span className="absolute bottom-1 right-1 bg-yellow-500 text-black font-black text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                    Kids
                  </span>
                )}
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-400 group-hover:text-white transition">
                {p.name}
              </span>
            </div>
          ))}

          {/* Add Profile Button */}
          {profiles.length < 5 && (
            <div
              onClick={() => setShowAddModal(true)}
              className="group flex flex-col items-center space-y-3 cursor-pointer"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-md border-2 border-dashed border-gray-600 group-hover:border-white flex items-center justify-center transition-all duration-200 transform group-hover:scale-105 bg-gray-900/50">
                <Plus className="w-12 h-12 text-gray-400 group-hover:text-white transition" />
              </div>
              <span className="text-sm md:text-base font-semibold text-gray-400 group-hover:text-white transition">
                Add Profile
              </span>
            </div>
          )}
        </div>

        <div className="pt-8">
          <button
            onClick={() => {
              if (profiles.length > 0) handleSelect(profiles[0])
            }}
            className="border border-gray-600 text-gray-400 hover:text-white hover:border-white px-6 py-2 uppercase text-xs md:text-sm font-semibold tracking-widest transition"
          >
            Manage Profiles
          </button>
        </div>
      </div>

      {/* Add Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#181818] border border-gray-800 rounded-lg p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-xl font-bold text-white">Add Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Profile Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-white text-sm"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="kids-check"
                  checked={isKids}
                  onChange={(e) => setIsKids(e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-red-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="kids-check" className="text-sm font-semibold text-gray-300 cursor-pointer select-none">
                  Kid's Profile? (12 & under)
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-white rounded text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E50914] hover:bg-red-700 text-white rounded text-xs font-bold transition"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
