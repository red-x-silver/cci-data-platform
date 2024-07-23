import React from 'react';
import { useSelector } from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { app } from '../firebase';
import { set } from 'mongoose';
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserFailure,deleteUserSuccess,signOutStart,signOutSuccess,signOutFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
  const fileInputRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  //below [] are used for creating new state
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false); 
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const dispatch = useDispatch();
  //console.log(formData);

  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]); //if there is a file, then call this handleFileUpload function
  
  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, 'avatars/' + fileName); //diff from the tutorial where there is no folder "avatars"
    const uploadTask = uploadBytesResumable(storageRef, file);
    //progree tracking
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
        setFilePerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        setFileUploadError(true);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL
          });
        });
      }
    );
  

  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //i wrote contentType instead of "Content-Type" initially and it was wrong, guess there is protocol for headers to conform to
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      } else {
        dispatch(updateUserSuccess(data));}
        setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  }
  
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      } else {
        dispatch(deleteUserSuccess(data));
        setDeleteSuccess(true);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }

  }

  const handleSignOut = async () => { 
    try {
      dispatch(signOutStart());

      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message));

        
      }else{
        window.location.href = '/log-in';
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));}
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 fron-semibold'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
        onChange={(e) => {setFile(e.target.files[0])}}
        type="file" ref={fileInputRef} hidden accept='image/*' />
        <img onClick={()=>fileInputRef.current.click()} src={formData.avatar || currentUser.avatar} alt={currentUser.username} 
        className='cursor-pointer object-cover w-24 h-24 rounded-full mx-auto' />

        <p className='text-sm self-center'>
        { 
        fileUploadError ? (<span className='text-red-600'>Error uploading file! (p.s. image must be less than 2mb )</span>) : 
        filePerc > 0 && filePerc < 100 ? (<span className='text-blue-600'>Uploading {filePerc}%</span>) :
        filePerc === 100 ? (<span className='text-blue-600'>Image successfully uploaded!</span>) 
        : ("")
        }

        </p>

        <input type="text" placeholder="username" id="username" defaultValue = {currentUser.username}
        className='border p-3 rounded-lg' onChange={handleChange}>
        </input>

        <input type="text" placeholder="email" id="email" defaultValue = {currentUser.email}
        className='border p-3 rounded-lg' onChange={handleChange}>
        </input>

        <input type="password" placeholder="new password" id="password"
        className='border p-3 rounded-lg' onChange={handleChange}>
        </input>

        <button disabled={loading} className='bg-blue-600 text-white rounded-lg p-3 hover:opacity-90 disabled:opacity-70'>
          {loading ? 'Loading...' : 'Update'}
          </button>

      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-600 cursor-pointer'>Delete account </span>
        <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign out </span>
    </div>
    <p className='text-red-600 mt-5'>{error ? error : ""}</p>
    <p className='text-blue-600 mt-5'>{updateSuccess ? "User profile successfully updated." : ""}</p>
    <p className='text-blue-600 mt-5'>{deleteSuccess ? "User profile successfully deleted." : ""}</p>
    </div>
  )
}

// firebass storage rules
// allow read; 
// allow write: if 
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*');
