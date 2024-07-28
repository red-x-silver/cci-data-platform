//import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export default function Header() {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(window.location.search);
  //   urlParams.set('searchTerm', searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const searchTermFromUrl = urlParams.get('searchTerm');
  //   if (searchTermFromUrl) {
  //     setSearchTerm(searchTermFromUrl);
  //   }
  // }, [location.search]);

  return (
    <header className="bg-black shadow-md font-family:roboto-mono">
        <div className='flex justify-between items-end p-4 '>
            <Link to='/'>
            <h1 className=' text-sm sm:text-xl flex flex-wrap'>
            <span className='text-white mx-1'>CCI  </span>
            <span className='text-blue-600'> Datasets for Creative AI Projects</span>
            </h1>
            </Link>

            {/* <form onSubmit={handleSubmit} className='bg-white  p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='search...' className='bg-transparent focus:outline-none'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
            <button><FaSearch className='text-blue-600' /></button>
            </form>  */}

            <nav>
                <ul className='flex gap-6 standard-text'>
                <Link to='/search'> <li className='mx-2 text-white hidden sm:inline hover:underline'>Datasets</li> </Link>
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
