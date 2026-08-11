import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from './store/authSlice'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfileSelectPage from './pages/ProfileSelectPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import MyListPage from './pages/MyListPage'
import SearchPage from './pages/SearchPage'
import PlayerPage from './pages/PlayerPage'
import NotFoundPage from './pages/NotFoundPage'

function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(fetchMe())
    }
  }, [token, dispatch])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/profiles"
        element={
          <ProtectedRoute>
            <ProfileSelectPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tv"
        element={
          <ProtectedRoute>
            <CategoryPage type="tv" title="TV Shows" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <CategoryPage type="movie" title="Movies" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-list"
        element={
          <ProtectedRoute>
            <MyListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watch/:movieId"
        element={
          <ProtectedRoute>
            <PlayerPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
