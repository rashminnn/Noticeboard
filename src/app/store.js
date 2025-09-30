import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import currentNoticesTableReducer from '../features/currentNoticesSlice'
import pastNoticesReducer from '../features/pastNoticesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentNotices: currentNoticesTableReducer,
    pastNotices: pastNoticesReducer,
  },
})
