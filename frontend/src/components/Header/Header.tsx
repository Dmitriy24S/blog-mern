import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkIsAuth, logOut } from '../../redux/slices/authSlice'
import LoginModal from '../Modals/LoginModal'
import RegisterModal from '../Modals/RegisterModal'

const Header = () => {
  const dispatch = useDispatch()

  const [isLoginOpen, setLoginIsOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const isAuth = useSelector(checkIsAuth)
  // console.log(isAuth, 'check auth - Header')

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
        <div className='header-user flex gap-5 items-center'>
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
              <Link
                to={'/posts/create'}
                className='bg-indigo-500 text-white px-4 h-full py-1 rounded hover:bg-indigo-600'
              >
                Create Post
              </Link>
              <button
                className='text-stone-500 hover:text-black py-1 px-4 rounded'
                onClick={() => dispatch(logOut())}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                // to={'/login'}
                className='bg-white border border-slate-300 py-1 px-4 rounded hover:text-slate-500'
                onClick={() => setLoginIsOpen(true)}
              >
                Login
              </button>
              {/* <Link
                to={'/login'}
                className='bg-white border border-slate-300 py-1 px-4 rounded hover:text-slate-500'
              >
                Login
              </Link> */}
              <button
                className='bg-indigo-500 text-white border border-transparent py-1 px-4 rounded hover:bg-indigo-500/90'
                onClick={() => setIsRegisterOpen(true)}
              >
                Register
              </button>
              {/* <Link
                to={'/register'}
                className='bg-indigo-500 text-white border border-transparent py-1 px-4 rounded hover:bg-indigo-500/90'
              >
                Register
              </Link> */}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoginModal isLoginOpen={isLoginOpen} setLoginIsOpen={setLoginIsOpen} />
      <RegisterModal isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen} />
    </header>
  )
}

export default Header
