import React from 'react';
import {FaSearch} from 'react-icons/fa';
import{Link} from 'react-router-dom';
import {useSelector} from 'react-redux';


export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <header className="bg-black shadow-md font-family:roboto-mono">
        <div className='flex justify-between items-center p-4 '>
            <Link to='/'>
            <h1 className=' text-sm sm:text-2xl flex flex-wrap'>
            <span className='text-white font-bold mx-1'>CCI </span>
            <span className='text-blue-600'> Datasets for Creative Projects</span>
            </h1>
            </Link>

            <form className='bg-white p-3 rounded-lg flex items-center standard-text'>
            <input type='text' placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-80' />
            <FaSearch className='text-blue-600' />
            </form> 

            <nav>
                <ul className='flex gap-6 standard-text'>
                <Link to='/'> <li className='mx-2 text-white hidden sm:inline hover:underline'>Datasets</li> </Link>
                <Link to='/projects'>   <li className='mx-2 text-white hidden sm:inline hover:underline'>Projects</li></Link>
                 <Link to='/about'>   <li className='mx-2 text-white hidden sm:inline hover:underline'>About</li></Link>
              
                 <Link to='/profile'>
                  {currentUser ? (
                    <img className="mx-2 rounded-full h-7 w-7 object-cover" 
                    src={currentUser.avatar} alt='profile'/>
                  ): 
                  (
                  <li className='mx-2 text-white sm:inline hover:underline'>Log in</li>
                  )}
                    
                    
                    </Link>
                </ul>
            </nav>
        
        </div>
     </header>
  )
}
