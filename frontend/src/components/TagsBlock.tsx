import React from 'react'

const TagsBlock = () => {
  return (
    <div className='bg-white p-4 shadow-sm rounded'>
      <h3 className='font-bold text-xl mb-5 px-4'>Tags</h3>
      <ul className='flex md:flex-col gap-3'>
        <li>
          <button className='hover:bg-gray-100 w-full text-start'># React</button>
        </li>
        <li>
          <button className='hover:bg-gray-100 w-full text-start'># CSS</button>
        </li>
        <li>
          <button className='hover:bg-gray-100 w-full text-start'># Node</button>
        </li>
      </ul>
    </div>
  )
}

export default TagsBlock
