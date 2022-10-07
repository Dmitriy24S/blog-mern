import React from 'react'
import { Link } from 'react-router-dom'

interface PostPropsType {
  id: number
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
  index: number
}

const Post = ({
  id,
  title,
  bodyText,
  imageUrl,
  user,
  createdAt,
  viewsCount,
  tags,
  // eslint-disable-next-line comma-dangle
  isFullPost,
  // eslint-disable-next-line comma-dangle
  index,
}: PostPropsType) => {
  console.log(isFullPost)

  return (
    <article className={`bg-white rounded shadow-sm ${isFullPost ? 'mt-12' : ''}`}>
      {imageUrl && (
        <img
          // className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          className='w-full h-full min-h-[175px] max-h-[324px] object-cover'
          src={imageUrl}
          alt={title}
        />
      )}
      <div className='post-content p-6 flex items-start'>
        <div className='bg-slate-600 text-white font-extrabold rounded-full min-h-[2rem] min-w-[2rem] mt-1.5 mr-3.5 text-center leading-8'>
          D
        </div>
        <div className='flex flex-col gap-3'>
          <div className='blog-top mb-1'>
            <div className='name font-bold'>{user.fullName}</div>
            <div className='time text-gray-500 text-sm'>{createdAt}</div>
          </div>
          <h2 className='text-3xl font-black hover:text-indigo-600'>
            {!isFullPost ? <Link to={`/posts/${id}`}>{title}</Link> : title}
          </h2>
          <p>{bodyText}</p>
          <div className='tags relative -left-4'>
            <ul className='flex gap-4 flex-wrap text-gray-500'>
              {tags.map((tag, idx) => (
                <li key={idx}>
                  <button className='hover:bg-gray-100'># {tag}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='blog-bottom flex gap-4'>
            <div className='flex items-center gap-1 text-gray-500 fill-gray-500'>
              <svg
                className='w-4 h-4'
                focusable='false'
                aria-hidden='true'
                viewBox='0 0 24 24'
                data-testid='RemoveRedEyeOutlinedIcon'
              >
                <path d='M12 6.5c3.79 0 7.17 2.13 8.82 5.5-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12C4.83 8.63 8.21 6.5 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5z'></path>
              </svg>
              {viewsCount}
            </div>
            <button className='hover:bg-gray-100 flex items-center gap-1 text-gray-500 fill-gray-500'>
              <svg
                className='w-4 h-4'
                focusable='false'
                aria-hidden='true'
                viewBox='0 0 24 24'
                data-testid='ChatBubbleOutlineOutlinedIcon'
              >
                <path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z'></path>
              </svg>
              4
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Post
