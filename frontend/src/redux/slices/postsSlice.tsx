// import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/axios'

export interface PostType {
  _id: string
  title: string
  bodyText: string
  imageUrl: string
  user: {
    avatarUrl: string
    fullName: string
  }
  createdAt: string
  viewsCount: number
  tags: string[]
  isFullPost: boolean
  index?: number
}

export interface PostsSliceInitialStateType {
  posts: {
    items: PostType[]
    status: string
  }
  tags: {
    items: string[]
    status: string
  }
}

const initialState: PostsSliceInitialStateType = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  }
}

export const fetchPosts = createAsyncThunk<PostType[]>('posts/fetchPosts', async () => {
  const { data }: { data: PostType[] } = await axios.get('/posts')
  console.log('async fetch redux slice', data)
  return data
})

// ! NO TYPE ERRORS?
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts')
  console.log('async fetch redux slice', data)
  return data
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const data: PostType[] = [...action.payload]
      state.posts.items = data
      console.log('fetch posts redux', data, 111111)
      state.posts.status = 'done'
    })
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      const data = [...action.payload]
      state.tags.items = data
      state.tags.status = 'done'
    })
  }
})

// Action creators are generated for each case reducer function
// export const {fetchPosts} = postsSlice.actions
export default postsSlice.reducer
