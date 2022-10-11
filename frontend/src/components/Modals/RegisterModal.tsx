import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { authParams, checkIsAuth, registerUser, UserDataType } from '../../redux/slices/authSlice'
import { useAppDispatch } from '../../redux/store'

interface RegisterProps {
  isRegisterOpen: boolean
  setIsRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterModal = ({ isRegisterOpen, setIsRegisterOpen }: RegisterProps) => {
  const dispatch = useAppDispatch()

  const isAuth = useSelector(checkIsAuth)

  // If recieve user data -> successful registration -> close register modal:
  useEffect(() => {
    if (isAuth) {
      setIsRegisterOpen(false)
    }
  }, [isAuth])

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors }
    // formState
  } = useForm({
    defaultValues: {
      fullName: 'john doe 2',
      email: 'johndoe2@test.com',
      password: '12345z2'
    }
  })

  const onSubmit = async (values: authParams) => {
    // console.log(values)
    // {email: 'dfsdfsdf@dsfsd', password: 'sdfsdfsdfsd'}
    // email:"dfsdfsdf@dsfsd"
    // password:"sdfsdfsdfsd"
    // dispatch(fetchUserData(values))

    const data = await dispatch(registerUser(values))
    console.log('on submit payload data await', data)
    // avatarUrl: 'https://www.resetera.com/forums/etcetera-forum.9/z'
    // createdAt: '2022-10-03T17:52:04.346Z'
    // email: 'johndoe@test.com'
    // fullName: 'John Doe'
    // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMjE0NGFkMjYzNTY4ZWUwZmZmNjkiLCJpYXQiOjE2NjU0MDAwMzgsImV4cCI6MTY2Nzk5MjAzOH0.r8n7fAMj-3xkdHckd5hkOSxqs7s7UWyaEyp-RjKup-U'
    // updatedAt: '2022-10-03T17:52:04.346Z'
    // __v: 0
    // _id: '633b2144ad263568ee0fff69'

    const payload = data.payload as UserDataType

    if (!payload) {
      alert('Failed to register?')
    }

    // save token to localStorage
    if ('token' in payload) {
      window.localStorage.setItem('token', payload.token)
    }
  }

  // my payload or hz:
  // {name: "john doe 2", email: "johndoe2@test.com", password: "12345z2"}
  // email: "johndoe2@test.com"
  // name: "john doe 2"
  // password: "12345z2"

  // console: why no meeesage mesa he ot name wtkfel
  // POST http://localhost:4444/auth/register 400 (Bad Request)
  // error: {name: 'AxiosError', message: 'Request failed with status code 400', stack: 'AxiosError: Re
  //  TypeError: Cannot use 'in' operator to search for 'token' in undefined

  // in network:
  // [{msg: "Name is required", param: "fullName", location: "body"}]
  // 0: {msg: "Name is required", param: "fullName", location: "body"}
  // location: "body"
  // msg: "Name is required"
  // param: "fullName"

  return (
    <Transition appear show={isRegisterOpen} as={Fragment}>
      {/* <Dialog open={isLoginOpen} onClose={() => setLoginIsOpen(false)} className='relative z-50'> */}
      <Dialog onClose={() => setIsRegisterOpen(false)} className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            {/* The actual dialog panel  */}
            <Dialog.Panel className='mx-auto max-w-sm rounded bg-white p-8 min-w-[22rem]'>
              <Dialog.Title className='text-center mb-8 text-indigo-600 text-3xl font-bold'>
                Register
              </Dialog.Title>
              <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-6'>
                  {/* Name input */}
                  <input
                    id='name'
                    type='text'
                    placeholder='Please enter your name'
                    className={`px-4 py-2 border border-slate-200 w-full ${
                      errors?.email && 'border-red-600'
                    }`}
                    // {...register('name', { required: 'Please enter your name' })}
                    {...register('fullName', { required: 'Please enter your name' })}
                  />
                  {/* input error msg */}
                  {errors?.fullName && (
                    <p className='text-red-600 tracking-wider ml-4 mt-2'>
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className='mb-6'>
                  {/* Email input */}
                  <input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    className={`px-4 py-2 border border-slate-200 w-full ${
                      errors?.email && 'border-red-600'
                    }`}
                    {...register('email', { required: 'Please enter email' })}
                  />
                  {/* input error msg */}
                  {errors?.email && (
                    <p className='text-red-600 tracking-wider ml-4 mt-2'>{errors.email.message}</p>
                  )}
                </div>
                {/* Password input */}
                <div>
                  <input
                    id='password'
                    type='password'
                    placeholder='Enter your password'
                    className={`px-4 py-2 border border-slate-200 w-full ${
                      errors?.password && 'border-red-600'
                    }`}
                    {...register('password', { required: 'Please enter password' })}
                  />
                  {/* input error msg */}
                  {errors?.password && (
                    <p className='text-red-600 tracking-wider ml-4 mt-2'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <button type='submit' className='bg-indigo-600 text-white hover:bg-indigo-500 mt-6'>
                  Register
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RegisterModal
