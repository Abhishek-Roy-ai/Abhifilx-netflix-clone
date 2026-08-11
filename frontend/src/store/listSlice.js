import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../services/api'

export const fetchMyList = createAsyncThunk('list/fetchMyList', async (profileId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/list?profileId=${profileId}`)
    return res.results || []
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const toggleMyList = createAsyncThunk('list/toggleMyList', async ({ profileId, media }, { getState, rejectWithValue }) => {
  try {
    const state = getState().list
    const exists = state.items.some((item) => item.id === media.id)
    if (exists) {
      await api.post('/list/remove', { profileId, mediaId: media.id })
      return { media, action: 'removed' }
    } else {
      await api.post('/list/add', { profileId, mediaId: media.id })
      return { media, action: 'added' }
    }
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const listSlice = createSlice({
  name: 'list',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(toggleMyList.fulfilled, (state, action) => {
        if (action.payload.action === 'added') {
          state.items.push(action.payload.media)
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload.media.id)
        }
      })
  }
})

export default listSlice.reducer
