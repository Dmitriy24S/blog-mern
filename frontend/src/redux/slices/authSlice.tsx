import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'
import { RootState } from '../store'

interface UserDataType {
  avatarUrl: string
  createdAt: string
  email: string
  fullName: string
  token: string
  updatedAt: string
  __v: number // ?
  _id: string
}

interface authParams {
  email: string
  password: string
}

interface AuthSliceInitialStateType {
  userData: UserDataType | null
  status: string
}

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params: authParams) => {
  const { data } = await axios.post('/auth/login', params)
  console.log('async fetch user data slice:', data)
  return data as UserDataType
})

const initialState: AuthSliceInitialStateType = {
  userData: null,
  status: 'loading'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData = null
    }
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.userData = null
      state.status = 'loading'
    })
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log('Auth Reducer / Slice - fetch user data payload', action.payload)
      state.userData = action.payload
      state.status = 'done'
    })
    builder.addCase(fetchUserData.rejected, (state) => {
      state.userData = null
      state.status = 'error'
    })
  }
})

export const checkIsAuth = (state: RootState) => Boolean(state.user.userData)

// Action creators are generated for each case reducer function
export const { logOut } = authSlice.actions
export default authSlice.reducer
