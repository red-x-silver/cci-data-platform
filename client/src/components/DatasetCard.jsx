import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function DatasetCard({ dataset }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/dataset/${dataset._id}`}>
        <img
          src={
            dataset.imageUrls[0] ||
            "https://wiki.cci.arts.ac.uk/uploads/images/gallery/2024-02/scaled-1680-/QIDK6deUudbGAezL-mirror.png"
          }
          alt='dataset cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {dataset.name}
          </p>

          <div className='flex items-center gap-1'>
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

          <p className='text-sm text-gray-600 line-clamp-2'>
            {dataset.shortDescription}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {dataset.tasks}
          </p>

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