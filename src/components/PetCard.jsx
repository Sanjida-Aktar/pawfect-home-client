import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export const fallbackImage =
  'https://placehold.co/800x600/e1e8e4/1c2b27?text=Photo+coming+soon';

export default function PetCard({ pet }) {
  const adopted = pet.status === 'adopted';

  return (
    <div className="card bg-base-100 border border-base-300 overflow-hidden hover:shadow-lg transition-shadow">
      <figure className="relative h-56">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
        <span
          className={`badge absolute top-3 left-3 ${adopted ? 'badge-neutral' : 'badge-secondary'}`}
        >
          {adopted ? 'Adopted' : 'Available'}
        </span>
      </figure>
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="card-title text-xl">{pet.name}</h3>
          <span className="font-semibold text-primary whitespace-nowrap">
            {pet.fee > 0 ? `৳ ${pet.fee}` : 'Free'}
          </span>
        </div>
        <p className="text-sm opacity-80">
          {pet.species} · {pet.breed}
        </p>
        <p className="text-sm opacity-80">
          {pet.age} · {pet.gender}
        </p>
        <p className="text-sm flex items-center gap-1 opacity-80">
          <MdLocationOn className="text-accent" /> {pet.location}
        </p>
        <div className="card-actions mt-3">
          <Link to={`/pets/${pet._id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
