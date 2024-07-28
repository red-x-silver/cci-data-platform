import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import DatasetCard from '../components/DatasetCard';
import { FaSearch } from 'react-icons/fa';

export default function Home() {
  const [trendDatasets, setTrendDatasets] = useState([]);
  const [imageDatasets, setImageDatasets] = useState([]);
  const [audioDatasets, setAudioDatasets] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  SwiperCore.use([Navigation]);
  console.log(trendDatasets);
  useEffect(() => {
    const fetchTrendDatasets = async () => {
      try {
        const res = await fetch('/api/dataset/get?&sort=created_at&order=desc'); //future: get new logic here for getting trend datasets
        const data = await res.json();
        setTrendDatasets(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAudioDatasets = async () => {
      try {
        const res = await fetch('/api/dataset/get?auditory=true&limit=4');
        const data = await res.json();
        setAudioDatasets(data);
        //fetchSaleDatasets();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchImageDatasets = async () => {
      try {
        const res = await fetch('/api/dataset/get?visual=true&limit=4');
        const data = await res.json();
        setImageDatasets(data);
        //fetchSaleDatasets();
      } catch (error) {
        console.log(error);
      }
    };


    fetchTrendDatasets();
    fetchImageDatasets();
    fetchAudioDatasets();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-5 pt-28 pb-16 px-3 w-full mx-auto bg-black text-white '>
        <h1 className='mx-auto text-3xl lg:text-5xl'>
          Get <span className='text-blue-600'>inspired</span> for 
          your next creative AI project
        </h1>
        <form onSubmit={handleSubmit} className='bg-white mt-10 p-3 rounded-lg flex mx-auto w-30 sm:w-80'>
            <input type='text' placeholder='search anything...' className='bg-transparent focus:outline-none text-black'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
            <button><FaSearch className='text-blue-600 ml-20' /></button>
            </form> 
        {/* <div className='text-gray-400 text-xs sm:text-sm'>
          Our platform is... 
          <br />
          We have a wide range of datasets and projects.
        </div> */}
        {/* <Link
          to={'/search'}
          className=' mx-auto text-xs sm:text-sm text-white font-bold hover:underline'
        >
          Let's get started...
        </Link> */}

      </div>

      {/* swiper */}
      <Swiper navigation>
        {trendDatasets &&
          trendDatasets.length > 0 &&
          trendDatasets.map((dataset) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${dataset.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={dataset._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* dataset results for offer, sale and rent */}

      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {trendDatasets && trendDatasets.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '>🗞️ Most recent datasets</h2>
              <Link className='text-sm text-blue-600 hover:underline' to={'/search?'}>Show more datasets</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {trendDatasets.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset._id} />
              ))}
            </div>
          </div>
        )}
                {imageDatasets && imageDatasets.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '> Visual datasets</h2>
              <Link className='text-sm text-blue-600 hover:underline' to={'/search?visual=true'}>Show more visual datasets</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {imageDatasets.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset._id} />
              ))}
            </div>
          </div>
        )}

        {audioDatasets && audioDatasets.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold'>🎧 Auditory datasets</h2>
              <Link className='text-sm text-blue-600 hover:underline' to={'/search?auditory=true'}>Show more auditory datasets</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {audioDatasets.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset._id} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}