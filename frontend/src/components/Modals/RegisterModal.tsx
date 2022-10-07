import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface RegisterProps {
  isRegisterOpen: boolean
  setIsRegisterOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterModal = ({ isRegisterOpen, setIsRegisterOpen }: RegisterProps) => {
  return (
    <Transition appear show={isRegisterOpen} as={Fragment}>
      {/* <Dialog open={isLoginOpen} onClose={() => setLoginIsOpen(false)} className='relative z-50'> */}
      <Dialog onClose={() => setIsRegisterOpen(false)} className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        {/* <div className='fixed inset-0 bg-black/30' aria-hidden='true' /> */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {/* <div className='fixed inset-0 bg-black bg-opacity-25' aria-hidden='true' /> */}
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
              <form className='flex flex-col gap-6'>
                <input
                  type='text'
                  placeholder='Enter your name'
                  className='px-4 py-2 border border-slate-200'
                />
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='px-4 py-2 border border-slate-200'
                />
                <input
                  type='password'
                  placeholder='Enter your password'
                  className='px-4 py-2 border border-slate-200'
                />
                <button
                  type='submit'
                  onClick={() => setIsRegisterOpen(false)}
                  className='bg-indigo-600 text-white mt-1 hover:bg-indigo-500'
                >
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
