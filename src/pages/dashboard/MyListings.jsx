import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { errorMessage } from '../../api';
import Spinner from '../../components/Spinner';
import { fallbackImage } from '../../components/PetCard';

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const statusBadge = {
  pending: 'badge-warning',
  approved: 'badge-success',
  rejected: 'badge-error',
};

export default function MyListings() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [requestPet, setRequestPet] = useState(null); // pet whose requests are open
  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(false);

  const [deletePet, setDeletePet] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadPets = () =>
    api
      .get('/my-pets')
      .then((res) => setPets(res.data))
      .catch((err) => toast.error(errorMessage(err, 'Could not load your listings')))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadPets();
  }, []);

  const total = pets.length;
  const adopted = pets.filter((p) => p.status === 'adopted').length;
  const available = total - adopted;

  const loadRequests = async (pet) => {
    setReqLoading(true);
    try {
      const res = await api.get(`/pets/${pet._id}/requests`);
      setRequests(res.data);
    } catch (err) {
      toast.error(errorMessage(err, 'Could not load requests'));
    } finally {
      setReqLoading(false);
    }
  };

  const openRequests = (pet) => {
    setRequestPet(pet);
    setRequests([]);
    loadRequests(pet);
  };

  const changeStatus = async (request, status) => {
    try {
      await api.patch(`/requests/${request._id}/status`, { status });
      toast.success(status === 'approved' ? 'Request approved' : 'Request rejected');
      await loadRequests(requestPet);
      loadPets(); // pet might be adopted now
    } catch (err) {
      toast.error(errorMessage(err, 'Could not update the request'));
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/pets/${deletePet._id}`);
      toast.success(`${deletePet.name} was removed`);
      setPets((prev) => prev.filter((p) => p._id !== deletePet._id));
      setDeletePet(null);
    } catch (err) {
      toast.error(errorMessage(err, 'Could not delete the pet'));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold">My listings</h1>

      <div className="stats stats-vertical sm:stats-horizontal shadow border border-base-300 w-full mt-4 bg-base-100">
        <div className="stat">
          <div className="stat-title">Total listings</div>
          <div className="stat-value text-primary">{total}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Available</div>
          <div className="stat-value text-secondary">{available}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Adopted</div>
          <div className="stat-value">{adopted}</div>
        </div>
      </div>

      {pets.length === 0 ? (
        <div className="text-center bg-base-100 rounded-box border border-base-300 p-12 mt-6">
          <p className="text-lg font-semibold">You have not listed any pets yet</p>
          <Link to="/dashboard/add-pet" className="btn btn-primary mt-4">Add your first pet</Link>
        </div>
      ) : (
        <div className="grid gap-5 mt-6 sm:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <div key={pet._id} className="card bg-base-100 border border-base-300 overflow-hidden">
              <figure className="h-44">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = fallbackImage)} />
              </figure>
              <div className="card-body p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{pet.name}</h3>
                  <span className={`badge ${pet.status === 'adopted' ? 'badge-neutral' : 'badge-secondary'}`}>{pet.status}</span>
                </div>
                <p className="text-primary font-semibold">{pet.fee > 0 ? `৳ ${pet.fee}` : 'Free'}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button onClick={() => openRequests(pet)} className="btn btn-sm btn-primary">Requests</button>
                  <Link to={`/dashboard/update-pet/${pet._id}`} className="btn btn-sm btn-outline">Edit</Link>
                  <Link to={`/pets/${pet._id}`} className="btn btn-sm btn-outline">View</Link>
                  <button onClick={() => setDeletePet(pet)} className="btn btn-sm btn-error btn-outline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* requests modal */}
      {requestPet && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl">Requests for {requestPet.name}</h3>

            {reqLoading ? (
              <Spinner />
            ) : requests.length === 0 ? (
              <p className="py-8 text-center opacity-70">Nobody has sent a request yet.</p>
            ) : (
              <ul className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {requests.map((r) => (
                  <li key={r._id} className="border border-base-300 rounded-lg p-4">
                    <div className="flex justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold">{r.userName}</p>
                        <p className="text-sm opacity-70 break-all">{r.userEmail}</p>
                      </div>
                      <span className={`badge ${statusBadge[r.status]}`}>{r.status}</span>
                    </div>
                    <p className="text-sm mt-2">Pickup date: <b>{formatDate(r.pickupDate)}</b></p>
                    <p className="text-sm opacity-80 mt-1">“{r.message}”</p>
                    {r.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => changeStatus(r, 'approved')} className="btn btn-success btn-sm">Approve</button>
                        <button onClick={() => changeStatus(r, 'rejected')} className="btn btn-error btn-sm">Reject</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="modal-action">
              <button onClick={() => setRequestPet(null)} className="btn">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* delete confirmation modal */}
      {deletePet && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete {deletePet.name}?</h3>
            <p className="py-3 text-sm opacity-80">
              This will remove the listing and all of its adoption requests. You cannot undo this.
            </p>
            <div className="modal-action">
              <button onClick={() => setDeletePet(null)} className="btn" disabled={deleting}>Keep pet</button>
              <button onClick={confirmDelete} className="btn btn-error" disabled={deleting}>
                {deleting ? <span className="loading loading-spinner loading-sm"></span> : 'Yes, delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
