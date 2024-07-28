import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatasetCard from '../components/DatasetCard';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    visual: false,
    auditory: false,
    textual: false,
    otherModality: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [datasets, setDatasets] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const visualFromUrl = urlParams.get('visual');
    const auditoryFromUrl = urlParams.get('auditory');
    const textualFromUrl = urlParams.get('textual');
    const otherModalityFromUrl = urlParams.get('otherModality');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      visualFromUrl ||
      auditoryFromUrl ||
      textualFromUrl ||
      otherModalityFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        visual: visualFromUrl === 'true' ? true : false,
        auditory: auditoryFromUrl === 'true' ? true : false,
        textual: textualFromUrl === 'true' ? true : false,
        otherModality: otherModalityFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchDatasets = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/dataset/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setDatasets(data);
      setLoading(false);
    };

    fetchDatasets();
  }, [location.search]);

  const handleChange = (e) => {

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'visual' ||
      e.target.id === 'auditory' ||
      e.target.id === 'textual' ||
      e.target.id === 'otherModality'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('visual', sidebardata.visual);
    urlParams.set('auditory', sidebardata.auditory);
    urlParams.set('textual', sidebardata.textual);
    urlParams.set('otherModality', sidebardata.otherModality);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfDatasets = datasets.length;
    const startIndex = numberOfDatasets;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/dataset/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setDatasets([...datasets, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.visual === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.visual === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.visual === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='otherModality'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.otherModality}
              />
              <span>Offer</span>
            </div>
          </div> */}
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Data Modalities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='visual'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.visual}
              />
              <span>Visual</span>
            </div>

            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='auditory'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.auditory}
              />
              <span>Auditory</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='textual'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.textual}
              />
              <span>Textual</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='otherModality'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.otherModality}
              />
              <span>Other modality</span>
            </div>

          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              {/* <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option> */}
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Earliest</option>
            </select>
          </div>
          <button className='bg-blue-700 text-white p-3 rounded-lg hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 mt-5'>
          dataset search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && datasets.length === 0 && (
            <p className='text-xl text-slate-700'>No dataset found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            datasets &&
            datasets.map((dataset) => (
              <DatasetCard key={dataset._id} dataset={dataset} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-blue-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}