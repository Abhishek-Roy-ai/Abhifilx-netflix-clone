import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import mediaReducer from './mediaSlice'
import listReducer from './listSlice'
import watchReducer from './watchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
    list: listReducer,
    watch: watchReducer
  }
})
