import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { errorMessage } from '../api';
import { useAuth } from '../context/AuthProvider';
import Spinner from '../components/Spinner';
import NotFound from './NotFound';
import { fallbackImage } from '../components/PetCard';

const today = new Date().toISOString().split('T')[0];

export default function PetDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (notFound || !pet) return <NotFound />;

  const isOwner = pet.ownerEmail === user.email;
  const adopted = pet.status === 'adopted';

  const handleAdopt = async (e) => {
    e.preventDefault();
    const form = e.target;

    setSending(true);
    try {
      await api.post('/requests', {
        petId: pet._id,
        pickupDate: form.pickupDate.value,
        message: form.message.value,
      });
      toast.success('Adoption request sent!');
      navigate('/dashboard/my-requests');
    } catch (err) {
      toast.error(errorMessage(err, 'Could not send the request'));
    } finally {
      setSending(false);
    }
  };

  const details = [
    ['Species', pet.species],
    ['Breed', pet.breed],
    ['Age', pet.age],
    ['Gender', pet.gender],
    ['Location', pet.location],
    ['Health', pet.healthStatus],
    ['Vaccination', pet.vaccinationStatus],
    ['Adoption fee', pet.fee > 0 ? `৳ ${pet.fee}` : 'Free'],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full max-h-[28rem] object-cover rounded-2xl"
          onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
        <div className="flex items-center gap-3 mt-6">
          <h1 className="text-4xl font-extrabold">{pet.name}</h1>
          <span className={`badge ${adopted ? 'badge-neutral' : 'badge-secondary'}`}>
            {adopted ? 'Adopted' : 'Available'}
          </span>
        </div>
        <p className="mt-3 leading-relaxed opacity-90">{pet.description}</p>

        <dl className="grid grid-cols-2 gap-4 mt-6">
          {details.map(([label, value]) => (
            <div key={label} className="bg-base-200 rounded-lg p-3">
              <dt className="text-xs opacity-60">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm opacity-60 mt-4">Listed by {pet.ownerEmail}</p>
      </div>

      <aside className="lg:col-span-2">
        <div className="card bg-base-100 border border-base-300 sticky top-24">
          <div className="card-body">
            <h2 className="text-2xl font-bold">Adoption request</h2>

            {isOwner ? (
              <p className="alert alert-info text-sm">This is your own listing, so you cannot send an adoption request.</p>
            ) : adopted ? (
              <p className="alert alert-warning text-sm">{pet.name} has already found a home. Requests are closed.</p>
            ) : (
              <form onSubmit={handleAdopt} className="space-y-3">
                <label className="form-control">
                  <span className="label-text mb-1">Pet name</span>
                  <input value={pet.name} readOnly className="input input-bordered bg-base-200" />
                </label>
                <label className="form-control">
                  <span className="label-text mb-1">Your name</span>
                  <input value={user.name || ''} readOnly className="input input-bordered bg-base-200" />
                </label>
                <label className="form-control">
                  <span className="label-text mb-1">Your email</span>
                  <input value={user.email} readOnly className="input input-bordered bg-base-200" />
                </label>
                <label className="form-control">
                  <span className="label-text mb-1">Pickup date</span>
                  <input name="pickupDate" type="date" min={today} className="input input-bordered" required />
                </label>
                <label className="form-control">
                  <span className="label-text mb-1">Message to the owner</span>
                  <textarea name="message" rows="3" className="textarea textarea-bordered" placeholder="Tell the owner a little about your home and why you want to adopt" required />
                </label>
                <button disabled={sending} className="btn btn-primary w-full">
                  {sending ? <span className="loading loading-spinner loading-sm"></span> : 'Adopt'}
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
