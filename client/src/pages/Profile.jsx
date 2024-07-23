import React from 'react';
import { useSelector } from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileInputRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  //below [] are used for creating new state
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false); 
  const [formData, setFormData] = useState({});
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
  
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 fron-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'>
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

// firebass storage rules
// allow read; 
// allow write: if 
// request.resource.size < 2*1024*1024 &&
// request.resource.contentType.matches('image/.*');
