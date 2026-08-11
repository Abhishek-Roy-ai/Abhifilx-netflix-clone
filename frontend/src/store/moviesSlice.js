import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tmdb } from '../services/tmdb'

export const fetchTrending = createAsyncThunk(
  'movies/fetchTrending',
  async (_, { getState }) => {
    const { ui } = getState()
    const data = await tmdb.getTrending({ language: ui.language })
    return data.results ?? []
  },
)

const initialState = {
  trending: [],
  status: 'idle',
  error: null,
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.trending = action.payload
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message ?? 'Failed to load trending movies'
      })
  },
})

export default moviesSlice.reducer

