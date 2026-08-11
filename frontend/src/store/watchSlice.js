import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../services/api'

export const fetchContinueWatching = createAsyncThunk('watch/fetchContinueWatching', async (profileId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/watch-history/continue-watching?profileId=${profileId}`)
    return res.results || []
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const updateWatchProgress = createAsyncThunk(
  'watch/updateProgress',
  async ({ profileId, mediaId, progressSeconds, totalSeconds }, { rejectWithValue }) => {
    try {
      const res = await api.post('/watch-history/progress', {
        profileId,
        mediaId,
        progressSeconds,
        totalSeconds
      })
      return res.record
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const watchSlice = createSlice({
  name: 'watch',
  initialState: {
    continueWatching: [],
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContinueWatching.fulfilled, (state, action) => {
      state.continueWatching = action.payload
      state.status = 'succeeded'
    })
  }
})

export default watchSlice.reducer
