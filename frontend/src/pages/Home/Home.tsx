/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Post from '../../components/Post/Post'
import PostSkeleton from '../../components/Post/PostSkeleton'
import Tabs from '../../components/Tabs'
import TagsBlock from '../../components/TagsBlock'
import { fetchPosts, PostType } from '../../redux/slices/postsSlice'
import { RootState, useAppDispatch } from '../../redux/store'

const Home = () => {
  const dispatch = useAppDispatch()

  const { posts } = useSelector((state: RootState) => state.posts)

  // temp
  useEffect(() => {
    console.log('Home posts:', posts)
  }, [posts])

  // fetch posts
  useEffect(() => {
    // console.log('Home useEffect run - fetchPosts', 1111111)
    dispatch(fetchPosts())
  }, [])

  const isPostsLoading = posts.status === 'loading'
  // const finalPosts = posts.items || [...Array(4)]

  return (
    <div className='home p-4'>
      <Tabs />
      <div className='posts-preview-container flex flex-col-reverse md:grid sm:grid-cols-3 gap-4 md:items-start'>
        <div className='posts-preview-container flex flex-col gap-4 col-span-2'>
          {/* If loading posts -> show posts skeleton */}
          {isPostsLoading &&
            [...Array(4)].map((_item, idx) => <PostSkeleton key={idx} isFullPost={false} />)}
          {/* If have posts -> show posts */}
          {posts &&
            posts.items.map((item: PostType, index) => (
              <Post
                key={index}
                index={index}
                _id={item._id}
                title={item?.title || 'Learn to code #1 | Rock Paper Scissors'}
                bodyText={
                  item?.bodyText ||
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae veniam dignissimos ratione, sequi, explicabo officiis expedita velit temporibus placeat sed, aliquid corrupti vel illo magni delectus voluptate? Cupiditate, magnam blanditiis'
                }
                imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                user={{
                  avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                  fullName: item?.user?.fullName || 'John Doe'
                }}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                tags={item.tags}
                isFullPost={false}
              />
            ))}
        </div>
        <TagsBlock />
      </div>
    </div>
  )
}

export default Home
