import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'
import { RootState } from '../store'

export interface UserDataType {
  avatarUrl: string
  createdAt: string
  email: string
  fullName: string
  token: string
  updatedAt: string
  __v: number // ?
  _id: string
}

export interface authParams {
  name?: string
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

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me') // axios already has token inside from localstorage and passes it !?
  console.log('async fetch auth me slice:', data)
  return data as UserDataType
})

export const registerUser = createAsyncThunk('/auth/registerUser', async (params: authParams) => {
  const { data } = await axios.post('/auth/register', params)
  console.log('async register user slice:', data)
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
    // fetchUserData:
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
    // fetchAuthMe:
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.userData = null
      state.status = 'loading'
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      console.log('Auth Reducer / Slice - fetch auth me data payload', action.payload)
      state.userData = action.payload
      state.status = 'done'
    })
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.userData = null
      state.status = 'error'
    })
    // registerUser:
    builder.addCase(registerUser.pending, (state) => {
      state.userData = null
      state.status = 'loading'
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log('Auth Reducer / Slice - register user data payload', action.payload)
      state.userData = action.payload
      state.status = 'done'
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.userData = null
      state.status = 'error'
    })
  }
})

export const checkIsAuth = (state: RootState) => Boolean(state.user.userData)

// Action creators are generated for each case reducer function
export const { logOut } = authSlice.actions
export default authSlice.reducer
