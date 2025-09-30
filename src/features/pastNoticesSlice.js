import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const fetchPastNoticesThunk = createAsyncThunk(
  'pastNotices/fetchData',
  async () => {
    try {
      const collectionRef = collection(db, 'pastNotices')
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

export const pastNoticesSlice = createSlice({
  name: 'pastNotices',
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
      .addCase(fetchPastNoticesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPastNoticesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.notices = action.payload
      })
      .addCase(fetchPastNoticesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export { fetchPastNoticesThunk }

// selectors
export const selectPastNoticesState = (state) => state.pastNotices

export default pastNoticesSlice.reducer
