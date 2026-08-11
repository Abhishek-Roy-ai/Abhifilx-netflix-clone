import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../services/api'

export const fetchCatalog = createAsyncThunk('media/fetchCatalog', async (_, { rejectWithValue }) => {
  try {
    const [heroRes, trendingRes, originalsRes, top10Res, moviesRes, tvRes] = await Promise.all([
      api.get('/media/hero'),
      api.get('/media/trending'),
      api.get('/media/originals'),
      api.get('/media/top10'),
      api.get('/media/movies'),
      api.get('/media/tv')
    ])

    return {
      hero: heroRes.hero,
      trending: trendingRes.results || [],
      originals: originalsRes.results || [],
      top10: top10Res.results || [],
      movies: moviesRes.results || [],
      tv: tvRes.results || []
    }
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const searchCatalog = createAsyncThunk('media/searchCatalog', async (query, { rejectWithValue }) => {
  try {
    const res = await api.get(`/media/search?q=${encodeURIComponent(query)}`)
    return res.results || []
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchMediaDetails = createAsyncThunk('media/fetchDetails', async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/media/${id}`)
    return res
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const mediaSlice = createSlice({
  name: 'media',
  initialState: {
    hero: null,
    trending: [],
    originals: [],
    top10: [],
    movies: [],
    tv: [],
    searchResults: [],
    searchQuery: '',
    activeMediaDetail: null,
    similarMedia: [],
    status: 'idle',
    error: null,
    modalOpen: false
  },
  reducers: {
    openDetailModal: (state, action) => {
      state.activeMediaDetail = action.payload
      state.modalOpen = true
    },
    closeDetailModal: (state) => {
      state.modalOpen = false
      state.activeMediaDetail = null
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.hero = action.payload.hero
        state.trending = action.payload.trending
        state.originals = action.payload.originals
        state.top10 = action.payload.top10
        state.movies = action.payload.movies
        state.tv = action.payload.tv
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(searchCatalog.fulfilled, (state, action) => {
        state.searchResults = action.payload
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.activeMediaDetail = action.payload.media
        state.similarMedia = action.payload.similar
      })
  }
})

export const { openDetailModal, closeDetailModal, setSearchQuery } = mediaSlice.actions
export default mediaSlice.reducer
