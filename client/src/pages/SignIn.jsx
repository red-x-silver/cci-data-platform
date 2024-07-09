import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hangdleChange = (e) => {
    setFormData({

      ...formData,
      [e.target.id]:e.target.value
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      //setLoading(true);
      dispatch(signInStart());
      const res=await fetch('/api/auth/log-in',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData), 
      }
      );
      const data = await res.json();
      if(data.success === false){
        //setLoading(false);
        //setError(data.message);
        dispatch(signInFailure(data.message));
        return;
    
      }
      //setLoading(false);
      //setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch(error){
      //setLoading(false);
      //setError(error.message);
      dispatch(signInFailure(data.message));

    }
    
    //console.log(data);
    
  } 
  //console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
    <h1 className='text-3xl text-center my-7 fron-semibold'>Log in</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="text" placeholder="email" className='border border-gray-300 rounded-md p-3 my-2' id='email' onChange={hangdleChange}/>
      <input type="text" placeholder="password" className='border border-gray-300 rounded-md p-3 my-2' id='password' onChange={hangdleChange}/>
      <button disabled={loading} className='bg-blue-600 p-3 rounded-lg hover:opacity-90 disabled:opacity-80'>
        {loading ? 'loading...' : 'log in'}
        </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Do not have an acount?</p>
      <Link to='/sign-up' className='text-blue-600'>
      <span>Sign up</span>
      </Link>
    
    </div>
    {error && <p className='text-red-500 mt-6'>{error}</p>}
    </div>
  )
}
