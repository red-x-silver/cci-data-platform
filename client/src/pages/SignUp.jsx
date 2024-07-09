import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className='text-3xl text-center my-7 fron-semibold'>Sign Up</h1>
    <form className='flex flex-col gap-4'>
      <input type="text" placeholder="username" className='border border-gray-300 rounded-md p-3 my-2' id='username' />
      <input type="text" placeholder="email" className='border border-gray-300 rounded-md p-3 my-2' id='email' />
      <input type="text" placeholder="password" className='border border-gray-300 rounded-md p-3 my-2' id='password' />
      <button className='bg-blue-600 p-3 rounded-lg hover:opacity-90 disabled:opacity-80'>sign up</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an acount?</p>
      <Link to='/log-in' className='text-blue-600'>
      <span>Log in</span>
      </Link>
    
    </div>
    </div>
  )
}
