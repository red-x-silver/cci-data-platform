import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaFly,
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
//import Contact from '../components/Contact';


export default function Dataset() {
  SwiperCore.use([Navigation]);
  const [dataset, setdataset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchdataset = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/dataset/get/${params.datasetId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setdataset(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchdataset();
  }, [params.datasetId]); //[para,s.datasetID] is the dependecy of useEffect()

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}

      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}

      {dataset && !loading && !error && (
        <div>
 

          <div className='flex flex-col max-w-7xl mx-auto p-3 my-7 gap-4'>

          <div className='flex gap-5 text-black mt-2 '>
            <p className='text-white bg-black text-5xl w-full p-2 rounded-md'>
              {dataset.name}
              {/* {dataset.offer
                ? dataset.discountPrice.toLocaleString('en-US')
                : dataset.regularPrice.toLocaleString('en-US')}
              {dataset.type === 'rent' && ' / month'} */}
            </p>
            <Link to={`${dataset.downloadLink}`} className=' sm:w-50 p-3 text-white bg-black rounded-lg hover:shadow-lg disabled:opacity-80'>       
            <button
              type='button'
              //disabled={uploading}
              //onClick={handleImageSubmit}
              className= "pt-2"
            >
              {/* {uploading ? 'Uploading...' : 'Upload'} */}
              download
            </button>
            </Link>
          </div>

          <div className = "border border-black mt-5 pb-5">

          <div className = "border border-black">
          <Swiper navigation>
            {dataset.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[600px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
                ))}
          </Swiper>
          </div>
          {/* <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div> */}
          {/* {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )} */}

            <p className='flex text-xl items-center mt-5 gap-2 pl-2 '>
              <FaFly className='text-blue-600' />
              {dataset.shortDescription}
            </p>

            <ul className=' mt-5 pl-3 text-blue-600 font-semibold flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                {dataset.visual
                  ? 'visual'
                  : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              {dataset.auditory
                  ? 'auditory'
                  : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              {dataset.textual
                  ? 'textual'
                  : ''}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
              {dataset.otherModality
                  ? 'other modality'
                  : ''}
              </li>
            </ul>


            </div>

            {/* <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {dataset.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {dataset.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+dataset.regularPrice - +dataset.discountPrice} OFF
                </p>
              )}
            </div> */}
  
            <div className = " pb-5">

            <div className='text-slate-800 mt-3 border border-b-0 border-black p-3'>
              <p className='text-xl font-semibold text-black'>Description: </p>
              <p className=' text-slate-700 mt-3' style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> {dataset.longDescription}</p>    
            </div>

            <div className='text-slate-800 border border-b-0 border-black p-3'>
              <p className='text-xl font-semibold text-black'>Origin: </p>
              <p className=' text-slate-700 mt-3'> {dataset.origin}</p>    
            </div>

            <div className='text-slate-800 border border-b-0 border-black p-3'>
              <p className='text-xl font-semibold text-black'>License: </p>
              <p className=' text-slate-700 mt-3'> {dataset.license}</p>    
            </div>

            <div className='text-slate-800 border border-b-0  border-black p-3'>
              <p className='text-xl font-semibold text-black'>Recommended tasks: </p>
              <p className=' text-slate-700 mt-3'> {dataset.tasks}</p>    
            </div>
            <div className='text-slate-800 border  border-black p-3'>
              <p className='text-xl font-semibold text-black'>Example projects: </p>
              <p className=' text-slate-700 mt-3'> projects xxx </p>    
            </div>

            </div>

          </div>
        </div>
      )}
      </main>
  );
}
