import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 fron-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt={currentUser.username} 
        className='object-cover w-24 h-24 rounded-full mx-auto' />

        <input type="text" placeholder="username" id="username"
        className='border p-3 rounded-lg'>
        </input>

        <input type="text" placeholder="email" id="email"
        className='border p-3 rounded-lg'>
        </input>

        <input type="text" placeholder="password" id="password"
        className='border p-3 rounded-lg'>
        </input>

        <button className='bg-blue-600 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70'>
          Update
          </button>

      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete account </span>
        <span className='text-red-600 cursor-pointer'>Sign out </span>
        

      </div>

    </div>
  )
}
