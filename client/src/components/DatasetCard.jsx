import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function DatasetCard({ dataset }) {
  return (
    <div className=' border-black border-2 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-md w-full sm:w-[400px]'>
      <Link to={`/dataset/${dataset._id}`}>
        <img
          src={
            dataset.imageUrls[0] ||
            "https://wiki.cci.arts.ac.uk/uploads/images/gallery/2024-02/scaled-1680-/QIDK6deUudbGAezL-mirror.png"
          }
          alt='dataset cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 border-b-2'
        />
        <div className='p-1 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold '>
            {dataset.name}
          </p>

      

          <p className='text-sm  line-clamp-3'>
            {dataset.shortDescription}
          </p>
          {/* <p className='mt-1 text-sm  font-semibold'>
   {dataset.tasks}
          </p> */}
          
          <div className='items-center gap-1 text-sm'>
          <ul className='  text-blue-600 font-semibold flex flex-wrap items-center gap-4 sm:gap-6'>
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

          {/* <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {dataset.bedrooms > 1
                ? `${dataset.bedrooms} beds `
                : `${dataset.bedrooms} bed `}
            </div>
            <div className='font-bold text-xs'>
              {dataset.bathrooms > 1
                ? `${dataset.bathrooms} baths `
                : `${dataset.bathrooms} bath `}
            </div>
          </div> */}
        </div>
      </Link>
    </div>
  );
}