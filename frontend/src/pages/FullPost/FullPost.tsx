import React from 'react'
import Post from '../../components/Post/Post'

const FullPost = () => {
  return (
    <div>
      <Post
        id={1}
        index={1}
        title='Learn to code #1 | Rock Paper Scissors'
        bodyText='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae veniam dignissimos
        ratione, sequi, explicabo officiis expedita velit temporibus placeat sed, aliquid
        corrupti vel illo magni delectus voluptate? Cupiditate, magnam blanditiis.'
        imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
        user={{
          avatarUrl:
            'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
          // eslint-disable-next-line comma-dangle
          fullName: 'John Doe',
        }}
        createdAt={'May 24 2022'}
        viewsCount={150}
        tags={['React', 'CSS', 'Node']}
        isFullPost={true}
      />
    </div>
  )
}

export default FullPost
