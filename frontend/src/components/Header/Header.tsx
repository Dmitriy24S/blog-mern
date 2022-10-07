import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const isAuth = false

  return (
    <header className='bg-white'>
      <div className='header-content-container max-w-6xl mx-auto header flex justify-between items-center py-2 px-4'>
        <div className='header-logo'>
          <Link
            to={'/'}
            className='bg-black text-white hover:bg-black/80 py-2 px-8 rounded font-black tracking-wider'
          >
            MERN BLOG
          </Link>
        </div>

        {/* Login / Register */}
        <div className='header-user flex gap-5'>
          {/* eslint: */}
          {/* {isAuth
            ? <>
            <Link to={'/posts/create'}>Create Post</Link>
              <button>Logout</button>
            </>
            : <>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </> } */}
          {/* prettier: */}
          {/* eslint-disable-next-line multiline-ternary */}
          {isAuth ? (
            <>
              <Link to={'/posts/create'}>Create Post</Link>
              <button>Logout</button>
            </>
          ) : (
            <>
              <Link
                to={'/login'}
                className='bg-white border border-slate-300 py-1 px-4 rounded hover:text-slate-500'
              >
                Login
              </Link>
              <Link
                to={'/register'}
                className='bg-indigo-500 text-white border border-transparent py-1 px-4 rounded hover:bg-indigo-500/90'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header