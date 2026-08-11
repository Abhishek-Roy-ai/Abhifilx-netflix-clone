import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext'

const STORAGE_KEY = 'netflix_clone_auth'

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function readInitialUser() {
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = raw ? safeParse(raw) : null
  return parsed?.user ?? null
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readInitialUser)

  const signUp = useCallback(({ name, email, password }) => {
    const nextUser = {
      name: name?.trim() || 'User',
      email: email?.trim() || '',
      avatarColor: '#E50914',
    }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: nextUser, credentials: { email: nextUser.email, password } }),
    )
    setUser(nextUser)
    return nextUser
  }, [])

  const signIn = useCallback(({ email, password }) => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? safeParse(raw) : null
    const saved = parsed?.credentials
    if (saved?.email && saved?.password) {
      if (saved.email !== (email?.trim() || '') || saved.password !== password) {
        throw new Error('Invalid email or password')
      }
      setUser(parsed.user ?? { name: 'User', email: saved.email, avatarColor: '#E50914' })
      return parsed.user
    }

    const nextUser = { name: 'User', email: email?.trim() || '', avatarColor: '#E50914' }
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user: nextUser, credentials: { email: nextUser.email, password } }),
    )
    setUser(nextUser)
    return nextUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(() => ({ user, isAuthed: !!user, signUp, signIn, logout }), [
    user,
    signUp,
    signIn,
    logout,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

