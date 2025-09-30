import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const fetchDataThunk = createAsyncThunk(
  'currentNotices/fetchData',
  async () => {
    try {
      const collectionRef = collection(db, 'currentNotices')
      const querySnapshot = await getDocs(collectionRef)

      const documentsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log(documentsArray)
      return documentsArray
    } catch (error) {
      throw error
    }
  }
)

export const currentNoticesSlice = createSlice({
  name: 'currentNotices',
  initialState: {
    notices: [],
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDataThunk.fulfilled, (state, action) => {
        state.loading = false
        state.notices = action.payload
      })
      .addCase(fetchDataThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export { fetchDataThunk }

// selectors
export const selectNoticesState = (state) => state.currentNotices

export default currentNoticesSlice.reducer
