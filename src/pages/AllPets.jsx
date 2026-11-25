import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import api from '../api';
import PetCard from '../components/PetCard';
import Spinner from '../components/Spinner';

const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export default function AllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [species, setSpecies] = useState([]);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    // small delay so we don't hit the api on every key press
    const timer = setTimeout(() => {
      setLoading(true);
      api
        .get('/pets', { params: { search, species: species.join(','), sort } })
        .then((res) => setPets(res.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, species, sort]);

  const toggleSpecies = (item) => {
    setSpecies((prev) => (prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]));
  };

  const clearFilters = () => {
    setSearch('');
    setSpecies([]);
    setSort('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold">All pets</h1>
      <p className="opacity-70 mt-1">Search by name, filter by species and sort by adoption fee.</p>

      <div className="mt-6 p-4 rounded-box bg-base-200 flex flex-col lg:flex-row gap-4 lg:items-center">
        <label className="input input-bordered flex items-center gap-2 lg:w-80">
          <MdSearch size={20} className="opacity-60" />
          <input
            type="text"
            className="grow"
            placeholder="Search by pet name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <div className="flex flex-wrap gap-2 flex-1">
          {speciesOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleSpecies(item)}
              className={`btn btn-sm ${species.includes(item) ? 'btn-primary' : 'btn-outline'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <select className="select select-bordered" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="fee-low">Fee: low to high</option>
          <option value="fee-high">Fee: high to low</option>
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : pets.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-semibold">No pets match your search</p>
          <p className="opacity-70 mt-1">Try a different name or remove some filters.</p>
          <button onClick={clearFilters} className="btn btn-primary btn-sm mt-4">Clear filters</button>
        </div>
      ) : (
        <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
        </div>
      )}
    </div>
  );
}
