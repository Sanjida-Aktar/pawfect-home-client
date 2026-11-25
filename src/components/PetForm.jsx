import { useAuth } from '../context/AuthProvider';

const speciesList = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

// used by both Add Pet and Update Pet
export default function PetForm({ pet = {}, onSubmit, submitting, buttonText }) {
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    onSubmit(data);
  };

  const inputClass = 'input input-bordered w-full';

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <label className="form-control">
        <span className="label-text mb-1">Pet name</span>
        <input name="name" defaultValue={pet.name} className={inputClass} placeholder="e.g. Bruno" required />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Species</span>
        <select name="species" defaultValue={pet.species || ''} className="select select-bordered w-full" required>
          <option value="" disabled>Select species</option>
          {speciesList.map((s) => <option key={s}>{s}</option>)}
        </select>
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Breed</span>
        <input name="breed" defaultValue={pet.breed} className={inputClass} placeholder="e.g. Golden Retriever" required />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Age</span>
        <input name="age" defaultValue={pet.age} className={inputClass} placeholder="e.g. 2 years" required />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Gender</span>
        <select name="gender" defaultValue={pet.gender || ''} className="select select-bordered w-full" required>
          <option value="" disabled>Select gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Image URL (imgbb / postimage)</span>
        <input name="image" type="url" defaultValue={pet.image} className={inputClass} placeholder="https://i.ibb.co/..." required />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Health status</span>
        <input name="healthStatus" defaultValue={pet.healthStatus} className={inputClass} placeholder="e.g. Healthy and active" required />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Vaccination status</span>
        <select name="vaccinationStatus" defaultValue={pet.vaccinationStatus || ''} className="select select-bordered w-full" required>
          <option value="" disabled>Select status</option>
          <option>Fully Vaccinated</option>
          <option>Partially Vaccinated</option>
          <option>Not Vaccinated</option>
          <option>Not Required</option>
        </select>
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Location</span>
        <input name="location" defaultValue={pet.location} className={inputClass} placeholder="e.g. Dhaka" required />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Adoption fee (৳, 0 for free)</span>
        <input name="fee" type="number" min="0" defaultValue={pet.fee ?? 0} className={inputClass} required />
      </label>

      <label className="form-control md:col-span-2">
        <span className="label-text mb-1">Description</span>
        <textarea name="description" defaultValue={pet.description} rows="4" className="textarea textarea-bordered w-full" placeholder="Tell adopters about the personality, habits and needs of this pet" required />
      </label>

      <label className="form-control md:col-span-2">
        <span className="label-text mb-1">Owner email</span>
        <input value={pet.ownerEmail || user?.email || ''} readOnly className={`${inputClass} bg-base-200`} />
      </label>

      <button type="submit" disabled={submitting} className="btn btn-primary md:col-span-2">
        {submitting ? <span className="loading loading-spinner loading-sm"></span> : buttonText}
      </button>
    </form>
  );
}
