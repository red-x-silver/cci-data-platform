import { useState,useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';

export default function UpdateDataset() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    shortDescription: '',
    longDescription: '',
    origin:'',
    license:'',
    tasks:'',
    tags:'',
    visual: false,
    textual: false,
    auditory: false,
    otherModality:false
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchDataset = async () => {
      const datasetId = params.datasetId;
      const res = await fetch(`/api/dataset/get/${datasetId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchDataset();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per dataset');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'datasetInfo/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    //if (e.target.id === 'visual' || e.target.id === 'auditory') {
     // setFormData({
     //   ...formData,
     //   type: e.target.id,
     // });
    //}

    if (
      e.target.id === 'visual' ||
      e.target.id === 'textual' ||
      
      e.target.id === 'auditory' ||
      e.target.id === 'other'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      //if (+formData.regularPrice < +formData.discountPrice)
       // return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/dataset/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/dataset/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className=' text-4xl font-bold mt-20 my-7 max-w-6xl mx-auto'> Edit dataset </h1>
      <p className=' max-w-6xl mx-auto my-7'>
            <span className='text-xl text-gray-600 '>
            Explore, analyze, and share quality data.
            </span>
          </p>
      
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-col gap-4 max-w-6xl mx-auto my-7'>
        <div className='flex flex-col gap-8 flex-1  my-5'>
          <input
            type='text'
            placeholder='Dataset Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62' //impoartant to make sure things won't go outside the screen
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <div className='flex gap-8 flex-wrap text-gray-600'>
            <span>Please specify data modality: </span>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='visual'
                className='w-5'
                onChange={handleChange}
                checked={formData.visual}
              />
              <span>Visual</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='auditory'
                className='w-5'
                onChange={handleChange}
                checked={formData.auditory}
              />
              <span>auditory</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='textual'
                className='w-5'
                onChange={handleChange}
                checked={formData.textual}
              />
              <span>Textual</span>
            </div>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='other'
                className='w-5'
                onChange={handleChange}
                checked={formData.other}
              />
              <span>other</span>
            </div>
          </div>

           <input
            type='text'
            placeholder='Short Description'
            className='border p-3 rounded-lg'
            id='shortDescription'
            required
            onChange={handleChange}
            value={formData.shortDescription}
          />

          <textarea
            type='text'
            placeholder='Long Description'
            className='border p-3 rounded-lg'
            id='longDescription'
            required
            onChange={handleChange}
            value={formData.longDescription}
          />
                     <input
            type='text'
            placeholder='Origin'
            className='border p-3 rounded-lg'
            id='origin'
            required
            onChange={handleChange}
            value={formData.origin}
          />

          <input
            type='text'
            placeholder='License'
            className='border p-3 rounded-lg'
            id='license'
            required
            onChange={handleChange}
            value={formData.license}
          />

          <input
            type='text'
            placeholder='Recommended tasks (seperated by ;) e.g. image classfication;text-to-image generation '
            className='border p-3 rounded-lg'
            id='tasks'
            required
            onChange={handleChange}
            value={formData.tasks}
          />

<input
            type='text'
            placeholder='Dataset tags (seperated by ;) e.g. daily object;photography '
            className='border p-3 rounded-lg'
            id='tags'
            required
            onChange={handleChange}
            value={formData.tags}
          />



          
          {/* <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'auditory' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.other && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'auditory' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div> */}
        </div>
        <div className='flex flex-col flex-1 gap-4 my-2'>
          <p className='font-semibold text-xl text-gray-600'>
            Upload information images for the dataset:
            <span className='font-normal ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-5 text-gray-600 mt-2'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-4 border border-gray-500 rounded-lg w-full '
              type='file'
              id='images'
              accept='image/*'
              multiple
              
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-5 text-blue-600 border border-blue-600 rounded-lg uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center rounded-lg'
              >
                <img
                  src={url}
                  alt='dataset information image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className='p-3 bg-blue-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update dataset'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>


      </main>
  )
}
