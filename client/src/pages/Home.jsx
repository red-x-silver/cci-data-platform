import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import DatasetCard from '../components/DatasetCard';

export default function Home() {
  const [trendDatasets, setTrendDatasets] = useState([]);
  const [imageDatasets, setImageDatasets] = useState([]);
  const [rentDatasets, setRentDatasets] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(trendDatasets);
  useEffect(() => {
    const fetchOfferDatasets = async () => {
      try {
        const res = await fetch('/api/dataset/get?offer=true&limit=4');
        const data = await res.json();
        setTrendDatasets(data);
        fetchRentDatasets();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentDatasets = async () => {
      try {
        const res = await fetch('/api/dataset/get?type=rent&limit=4');
        const data = await res.json();
        setRentDatasets(data);
        fetchSaleDatasets();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleDatasets = async () => {
      try {
        const res = await fetch('/api/dataset/get?type=sale&limit=4');
        const data = await res.json();
        setImageDatasets(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferDatasets();
  }, []);
  return (
    <div>
      {/* top */}
      {/* <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>

      </div> */}

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

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {trendDatasets && trendDatasets.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {trendDatasets.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset._id} />
              ))}
            </div>
          </div>
        )}
        {rentDatasets && rentDatasets.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentDatasets.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset._id} />
              ))}
            </div>
          </div>
        )}
        {imageDatasets && imageDatasets.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {imageDatasets.map((dataset) => (
                <DatasetCard dataset={dataset} key={dataset._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}