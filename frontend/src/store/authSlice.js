import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../services/api'

const STORAGE_PROFILE_KEY = 'netflix_current_profile'
const STORAGE_TOKEN_KEY = 'netflix_token'

const getSavedToken = () => {
  try {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY)
    if (!token || token === 'undefined' || token === 'null' || token.trim() === '') return null
    return token
  } catch {
    return null
  }
}

const getSavedProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY)
    if (!raw || raw === 'undefined' || raw === 'null') return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/login', { email, password })
    if (data.token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, data.token)
    }
    if (data.profiles && data.profiles.length > 0) {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(data.profiles[0]))
    }
    return data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/register', { name, email, password })
    if (data.token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, data.token)
    }
    if (data.profiles && data.profiles.length > 0) {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(data.profiles[0]))
    }
    return data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const data = await api.get('/auth/me')
    return data
  } catch (err) {
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    localStorage.removeItem(STORAGE_PROFILE_KEY)
    return rejectWithValue(err.message)
  }
})

export const createProfile = createAsyncThunk('auth/createProfile', async ({ name, avatar, isKids }, { rejectWithValue }) => {
  try {
    const data = await api.post('/profiles', { name, avatar, isKids })
    return data.profile
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    profiles: [],
    currentProfile: getSavedProfile(),
    token: getSavedToken(),
    status: 'idle',
    error: null
  },
  reducers: {
    selectProfile: (state, action) => {
      state.currentProfile = action.payload
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null
      state.profiles = []
      state.currentProfile = null
      state.token = null
      localStorage.removeItem(STORAGE_TOKEN_KEY)
      localStorage.removeItem(STORAGE_PROFILE_KEY)
    },
    clearAuthError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.profiles = action.payload.profiles || []
        state.token = action.payload.token
        state.currentProfile = action.payload.profiles?.[0] || null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.profiles = action.payload.profiles || []
        state.token = action.payload.token
        state.currentProfile = action.payload.profiles?.[0] || null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.profiles = action.payload.profiles || []
        if (!state.currentProfile && action.payload.profiles?.length > 0) {
          state.currentProfile = action.payload.profiles[0]
          localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(action.payload.profiles[0]))
        }
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null
        state.profiles = []
        state.currentProfile = null
        state.token = null
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload)
        if (!state.currentProfile) {
          state.currentProfile = action.payload
          localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(action.payload))
        }
      })
  }
})

export const { selectProfile, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
